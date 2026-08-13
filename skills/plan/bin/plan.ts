#!/usr/bin/env node
// Step tracker for long, multi-session plans. Steps nest to any depth; only leaves are executed.
// A planner session settles every decision; a cold executor session runs one step and grades
// nothing — so every check is a shell command the tool runs itself.
//
//   plan <plan>                      print the next undone leaf step
//   plan <plan> <step>               mark it done (its gate must pass), then print the next
//   plan <plan> <step> --block "why" halt and hand the step back to the planner
//   plan <plan> --note "learnt this" record a fact that prints with every later step
//   plan <plan> -l                   validate the file and print the whole tree
//
// Prints `0` when every step is done, then moves the file to wip-plans/.
// plan/<name>.plan.json is an ordered object of nodes, plus an optional top-level "_" preamble:
//   { "_": "context every step needs", "<step>": { "s": "…", "d": 0, "v": "…", "t": "…", "c": {…} } }
//   s  what to do (leaf) or a short group label (node with c)
//   d  0|1 — leaves only, groups derive it from their children
//   v  staleness check: shell command run BEFORE the step. non-zero = the step describes code
//      that no longer exists, so it must not be executed. never run at mark time.
//   t  proof gate: shell command run on mark, must exit 0 or the step is not marked.
//      required on every undone leaf. "-" means deliberately unchecked.
//   c  children — makes this node a group; groups are never executed, only their leaves
//
// Node 22.6+ strips the types natively, so this runs with plain `node plan.ts`.

import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, unlinkSync, appendFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, join, sep } from 'node:path';

type Node = { s: string; d?: 0 | 1; v?: string; t?: string; c?: Record<string, Node> };
type Plan = Record<string, Node>;

const MAX_TRIES = 3;

const die = (msg: string): never => {
	console.error(msg);
	process.exit(1);
};

const [, , plan_name, ...rest] = process.argv;
if (!plan_name) die('usage: plan <plan_name> [step_name] [--block "why"] [--note "learnt"] | plan <plan_name> -l');

const list_mode = rest.includes('-l') || rest.includes('--list');
const block_at = rest.indexOf('--block');
const block_why = block_at === -1 ? null : (rest[block_at + 1] ?? 'no reason given');
const note_at = rest.indexOf('--note');
const note_text = note_at === -1 ? null : (rest[note_at + 1] ?? '');
// a flag and its value are one unit; whatever is left over is the step name
const args: string[] = [];
for (let i = 0; i < rest.length; i++) {
	if (rest[i] === '--block' || rest[i] === '--note') i++;
	else args.push(rest[i]);
}
const step_arg = args.find((a) => !a.startsWith('-'));

// accept both `foo` and `foo.plan.json`; always resolves under plan/, no escaping via `/` or `..`
const bare = plan_name.replace(/\.plan\.json$/, '');
const plan_dir = resolve('plan') + sep;
const file = resolve(plan_dir, `${bare}.plan.json`);
if (!file.startsWith(plan_dir)) die(`refusing to escape plan/: ${plan_name}`);
const blocked_file = resolve(plan_dir, `${bare}.blocked.md`);
const tries_file = resolve(plan_dir, `.${bare}.tries.json`);
const log_file = resolve(plan_dir, `${bare}.log`);
const notes_file = resolve(plan_dir, `${bare}.notes.md`);
const tests_dir = resolve(plan_dir, 'tests');

// already archived — an unattended loop keeps getting `0` instead of a crash
if (!existsSync(file) && existsSync(resolve('wip-plans', `${bare}.plan.json`))) {
	console.log('0');
	process.exit(0);
}

let raw: string;
try {
	raw = readFileSync(file, 'utf8');
} catch (e) {
	die(`cannot read ${file}: ${(e as Error).message}`);
}

let plan: Plan;
try {
	plan = JSON.parse(raw!) as Plan;
} catch (e) {
	die(`${file} is not valid json: ${(e as Error).message}`);
}

// JSON.parse silently keeps the last of two same-name keys — a step would vanish without a trace
const dup = dup_key(raw!);
if (dup) die(`duplicate step/field name "${dup}" in ${file} — json silently drops the first one, rename it`);

const preamble = typeof plan!._ === 'string' ? (plan!._ as unknown as string) : null;
if ('_' in plan! && preamble === null) die(`top-level "_" must be a string — it is the preamble printed with every step`);
delete (plan as Record<string, unknown>)._;

validate(plan!, []);

const flat = leaves(plan!, []);
if (!flat.length) die(`${file} has no steps`);

let todo = flat.findIndex((l) => l.node.d !== 1);
let next = todo === -1 ? null : flat[todo];

if (list_mode) {
	list();
	process.exit(0);
}

// one cold session tells the next what it found. recording is always allowed, even when blocked.
if (note_text !== null) {
	if (!note_text.trim()) die('--note needs text: plan ' + bare + ' --note "what you learnt"');
	appendFileSync(notes_file, `- ${new Date().toISOString().slice(0, 10)} ${note_text.trim()}\n`);
	console.log(`noted → ${notes_file}`);
	process.exit(0);
}

// a blocked plan must not keep grinding unattended — the planner amends it and deletes the file
if (existsSync(blocked_file)) {
	die(`${bare} is BLOCKED — see ${blocked_file}\nthe planner must amend the plan and delete that file before work continues.`);
}

if (block_why !== null) {
	if (!next) die(`${bare} is complete — nothing to block.`);
	block(next, block_why, null);
}

if (step_arg) {
	if (!next) die(`${bare} is complete — nothing to mark.`);
	const id = next.path.join('.');
	if (step_arg !== id && step_arg !== next.path[next.path.length - 1]) {
		const known = flat.find((l) => l.path.join('.') === step_arg || l.path[l.path.length - 1] === step_arg);
		if (known && known.node.d === 1) die(`${step_arg} is already done. the step to do now is ${id} — run: plan ${bare}`);
		if (known) die(`refusing to mark ${known.path.join('.')} — steps are done in order. the step to do now is ${id}`);
		die(`no step "${step_arg}" in ${file}. the step to do now is ${id}`);
	}
	mark(next);
	todo = flat.findIndex((l) => l.node.d !== 1);
	next = todo === -1 ? null : flat[todo];
}

if (!next) {
	archive();
	console.log('0');
	process.exit(0);
}

stale_check(next);
show(next, todo);

// ── traversal ────────────────────────────────────────────────────────────────

function leaves(tree: Plan, prefix: string[]): { path: string[]; node: Node }[] {
	const out: { path: string[]; node: Node }[] = [];
	for (const [name, node] of Object.entries(tree)) {
		const path = [...prefix, name];
		if (node.c) out.push(...leaves(node.c, path));
		else out.push({ path, node });
	}
	return out;
}

function complete(node: Node): boolean {
	return node.c ? Object.values(node.c).every(complete) : node.d === 1;
}

function at(path: string[]): Node {
	let node: Node = { s: '', c: plan };
	for (const name of path) node = node.c![name];
	return node;
}

// every ancestor of the given leaf, deepest first
function ancestors(path: string[]): { name: string; node: Node }[] {
	const out: { name: string; node: Node }[] = [];
	for (let i = path.length - 1; i > 0; i--) out.push({ name: path.slice(0, i).join('.'), node: at(path.slice(0, i)) });
	return out;
}

// ── gates ────────────────────────────────────────────────────────────────────

function run_gate(cmd: string): { ok: boolean; out: string; status: number | null } {
	const r = spawnSync(cmd, { shell: true, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
	return { ok: r.status === 0, out: `${r.stdout ?? ''}${r.stderr ?? ''}`, status: r.status };
}

// vitest prints the reason at the top and the summary at the bottom — keep both ends
function clip(text: string): string {
	const lines = text.split('\n');
	if (lines.length <= 60) return text;
	return [...lines.slice(0, 40), `… ${lines.length - 60} lines cut …`, ...lines.slice(-20)].join('\n');
}

// `v` proves the world still matches what the step describes. it can only be true BEFORE the
// step runs — after the edit the old code is gone by design — so it never runs at mark time.
function stale_check(leaf: { path: string[]; node: Node }): void {
	if (!leaf.node.v) return;
	const label = leaf.path.join('.');
	const r = run_gate(leaf.node.v);
	if (r.ok) return;
	console.error(`STALE — ${label} describes code that is no longer there.\n`);
	console.error(`  v: ${leaf.node.v}\n  exit ${r.status}\n${clip(r.out)}\n`);
	console.error('do NOT execute this step. the repo moved since the plan was written.');
	block(leaf, `stale: v gate failed — ${leaf.node.v}`, r.out);
}

// ── mark ─────────────────────────────────────────────────────────────────────

function mark(leaf: { path: string[]; node: Node }): void {
	const label = leaf.path.join('.');

	if (leaf.node.t && leaf.node.t !== '-') {
		console.log(`gate [${label}]: ${leaf.node.t}`);
		const r = run_gate(leaf.node.t);
		if (!r.ok) {
			const n = bump_tries(label);
			console.error(`\nFAILED (exit ${r.status}) — ${label} is NOT done. attempt ${n}/${MAX_TRIES}\n${clip(r.out)}`);
			if (n >= MAX_TRIES) block(leaf, `gate failed ${n} times: ${leaf.node.t}`, r.out);
			console.error(`\nfix it — that fix is part of this step — then run: plan ${bare} ${label}`);
			process.exit(1);
		}
		console.log('  ok');
	}

	// the leaf is done and stays done — a group gate failing later must not throw this work away
	leaf.node.d = 1;
	save();
	clear_tries(label);
	appendFileSync(log_file, `${new Date().toISOString()}\t${label}\t${head()}\n`);
	console.log(`done: ${label}\n`);

	// a leaf finishing can finish the groups above it — their gates fire in the same breath
	for (const a of ancestors(leaf.path)) {
		if (!complete(a.node) || !a.node.t || a.node.t === '-') continue;
		console.log(`gate [${a.name}]: ${a.node.t}`);
		const r = run_gate(a.node.t);
		if (!r.ok) {
			console.error(`\nFAILED (exit ${r.status}) — group ${a.name} is broken. ${label} itself stayed done.\n${clip(r.out)}`);
			console.error(`\nfix the group, then run: plan ${bare}`);
			process.exit(1);
		}
		console.log('  ok');
	}
}

function head(): string {
	const r = spawnSync('git rev-parse --short HEAD', { shell: true, encoding: 'utf8' });
	return r.status === 0 ? r.stdout.trim() : '-';
}

// another session may have ticked a step while this one was running its gate
function save(): void {
	if (readFileSync(file, 'utf8') !== raw) die(`${file} changed while this step ran — another session is on it. re-run: plan ${bare}`);
	const body: Record<string, unknown> = preamble === null ? {} : { _: preamble };
	Object.assign(body, normalize(plan));
	raw = JSON.stringify(body, null, '\t') + '\n';
	writeFileSync(file, raw);
}

// groups derive `d` from their children, and keys go in a fixed order so diffs stay readable
function normalize(tree: Plan): Plan {
	const out: Plan = {};
	for (const [name, node] of Object.entries(tree)) {
		const clean: Node = { s: node.s, d: complete(node) ? 1 : 0 };
		if (node.v) clean.v = node.v;
		if (node.t) clean.t = node.t;
		if (node.c) clean.c = normalize(node.c);
		out[name] = clean;
	}
	return out;
}

function archive(): void {
	mkdirSync(resolve('wip-plans'), { recursive: true });
	renameSync(file, join(resolve('wip-plans'), `${bare}.plan.json`));
	// notes go with it, or a later plan of the same name inherits them
	if (existsSync(notes_file)) renameSync(notes_file, join(resolve('wip-plans'), `${bare}.notes.md`));
	if (existsSync(tries_file)) unlinkSync(tries_file);
}

// ── blocking ─────────────────────────────────────────────────────────────────

// the executor never decides anything and never waits on a human: it writes what it hit and stops.
// the planner reads this file next session, amends the plan, deletes it.
function block(leaf: { path: string[]; node: Node }, why: string, out: string | null): never {
	const label = leaf.path.join('.');
	const lines = [
		`# ${bare} blocked at ${label}`,
		'',
		`when: ${new Date().toISOString()}`,
		`head: ${head()}`,
		`why: ${why}`,
		'',
		'## the step',
		'',
		...ancestors(leaf.path).reverse().map((a) => `- ${a.name}: ${a.node.s}`),
		'',
		leaf.node.s,
		'',
		...(leaf.node.v ? ['## v', '', '```', leaf.node.v, '```', ''] : []),
		...(leaf.node.t ? ['## t', '', '```', leaf.node.t, '```', ''] : []),
		...(out ? ['## output', '', '```', clip(out), '```', ''] : []),
		'## next',
		'',
		'planner: amend plan/' + bare + '.plan.json, then delete this file.'
	];
	// the planner is about to change the step, so the old attempts are about a step that no
	// longer exists — deleting the block file must hand back a full budget
	clear_tries(label);
	writeFileSync(blocked_file, lines.join('\n'));
	console.error(`\nBLOCKED — wrote ${blocked_file}`);
	console.error('stop here. the planner amends the plan; nothing else is in scope.');
	process.exit(1);
}

function tries(): Record<string, number> {
	try {
		return JSON.parse(readFileSync(tries_file, 'utf8'));
	} catch {
		return {};
	}
}

function bump_tries(label: string): number {
	const t = tries();
	t[label] = (t[label] ?? 0) + 1;
	writeFileSync(tries_file, JSON.stringify(t));
	return t[label];
}

function clear_tries(label: string): void {
	const t = tries();
	if (!(label in t)) return;
	delete t[label];
	writeFileSync(tries_file, JSON.stringify(t));
}

// ── output ───────────────────────────────────────────────────────────────────

function show(leaf: { path: string[]; node: Node }, i: number): void {
	const label = leaf.path.join('.');
	console.log(`step ${i + 1}/${flat.length}  ${label}`);
	for (let d = 1; d < leaf.path.length; d++) console.log(`  ${'  '.repeat(d - 1)}^ ${at(leaf.path.slice(0, d)).s}`);

	// the executor never sees the rest of the plan, so it needs the shape of what already exists
	const done_ids = flat.filter((l) => l.node.d === 1).map((l) => l.path.join('.'));
	if (done_ids.length) console.log(`\nalready built: ${done_ids.join(', ')}`);

	if (preamble) console.log(`\n--- always applies ---\n${preamble}\n----------------------`);
	const notes = existsSync(notes_file) ? readFileSync(notes_file, 'utf8').trim() : '';
	if (notes) console.log(`\n--- learnt while running this plan ---\n${notes}\n--------------------------------------`);
	console.log(`\n${leaf.node.s}\n`);

	if (leaf.node.t && leaf.node.t !== '-') console.log(`t [${label}]: ${leaf.node.t}`);
	leaf.node.d = 1;
	for (const a of ancestors(leaf.path)) if (complete(a.node) && a.node.t && a.node.t !== '-') console.log(`t [${a.name}]: ${a.node.t}`);
	leaf.node.d = 0;

	console.log(`done:    plan ${bare} ${label}`);
	console.log(`stuck:   plan ${bare} ${label} --block "what you hit"`);
	console.log(`learnt:  plan ${bare} --note "fact the next step needs"`);
}

function list(): void {
	const walk = (tree: Plan, depth: number, prefix: string[]): void => {
		for (const [name, node] of Object.entries(tree)) {
			const path = [...prefix, name];
			const cur = next && path.join('.') === next.path.join('.');
			const gate = `${node.v ? ' +v' : ''}${node.t && node.t !== '-' ? ' +t' : ''}`;
			console.log(`${complete(node) ? '✓' : cur ? '→' : '·'} ${'  '.repeat(depth)}${name}${gate}`);
			if (node.c) walk(node.c, depth + 1, path);
		}
	};
	walk(plan, 0, []);
	const done = flat.filter((l) => l.node.d === 1).length;
	const no_v = flat.filter((l) => l.node.d !== 1 && !l.node.v).length;
	const waived = flat.filter((l) => l.node.t === '-').length;
	console.log(`\n${done}/${flat.length} leaf steps done, max depth ${Math.max(...flat.map((l) => l.path.length))}`);
	if (!preamble) console.log('warn: no top-level "_" preamble — every step is run by a cold session that sees nothing else');
	// a staged test nobody copies never runs: the gate stays green and the step proved nothing
	const orphans = staged(tests_dir, tests_dir).filter((d) => !flat.some((l) => l.node.s.includes(d)));
	if (orphans.length) console.log(`warn: no step copies ${orphans.length} staged test(s): ${orphans.join(', ')}`);
	if (waived) console.log(`warn: ${waived} leaf steps waive their gate with "t": "-"`);
	if (no_v) console.log(`note: ${no_v} undone leaf steps have no "v" — fine unless the step assumes code that already exists`);
}

// every plan/tests/**/*.txt, as the destination path each one is meant to be copied to
function staged(dir: string, base: string): string[] {
	if (!existsSync(dir)) return [];
	const out: string[] = [];
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) out.push(...staged(p, base));
		else if (e.name.endsWith('.txt')) out.push(p.slice(base.length + 1).replace(/\.txt$/, ''));
	}
	return out;
}

// ── validation ───────────────────────────────────────────────────────────────

function validate(tree: unknown, path: string[]): void {
	const where = path.length ? ` at ${path.join('.')}` : '';
	if (typeof tree !== 'object' || tree === null || Array.isArray(tree)) die(`steps must be a json object${where}`);
	const entries = Object.entries(tree as Plan);
	if (!entries.length) die(`empty step group${where} — a group with no children can never be done, delete it or give it steps`);
	for (const [name, node] of entries) {
		const p = [...path, name];
		const id = p.join('.');
		// v8 reorders integer-like keys, and insertion order IS plan order
		if (!/^[a-z][a-z0-9_]*$/.test(name)) die(`bad step name "${id}" — snake_case only: ^[a-z][a-z0-9_]*$`);
		if (typeof node !== 'object' || node === null || Array.isArray(node)) die(`step ${id} must be an object`);
		for (const k of Object.keys(node)) if (!'sdvtc'.includes(k) || k.length !== 1) die(`unknown field "${k}" on step ${id} — only s, d, v, t, c exist (a typo here silently drops instructions)`);
		if (typeof node.s !== 'string' || !node.s.trim()) die(`step ${id} needs "s": what to do`);
		for (const k of ['v', 't'] as const) if (k in node && (typeof node[k] !== 'string' || !node[k]!.trim())) die(`"${k}" on step ${id} must be a non-empty string`);
		if ('d' in node && node.d !== 0 && node.d !== 1) die(`"d" on step ${id} must be 0 or 1`);
		if ('c' in node) validate(node.c, p);
		// nothing else ever checks the work — an ungated step is a step nobody proved
		else if (node.d !== 1 && !node.t) die(`step ${id} has no gate — add "t": a command that proves it worked, or "t": "-" to waive it on purpose`);
	}
}

// the file already parsed, so any string right before a `:` is a key
function dup_key(text: string): string | null {
	const stack: (Set<string> | null)[] = [];
	let cur: Set<string> | null = null;
	let str: string | null = null;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (ch === '"') {
			let j = i + 1;
			let val = '';
			while (j < text.length && text[j] !== '"') {
				if (text[j] === '\\') val += text[j++];
				val += text[j++];
			}
			str = val;
			i = j;
		} else if (ch === '{' || ch === '[') {
			stack.push(cur);
			cur = ch === '{' ? new Set() : null;
			str = null;
		} else if (ch === '}' || ch === ']') {
			cur = stack.pop() ?? null;
			str = null;
		} else if (ch === ':' && cur && str !== null) {
			if (cur.has(str)) return str;
			cur.add(str);
			str = null;
		}
	}
	return null;
}
