#!/usr/bin/env node
// self-check for plan.ts — `node ~/.local/bin/plan.test.ts`
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import assert from 'node:assert';

const cli = join(dirname(new URL(import.meta.url).pathname), 'plan.ts');
let root = '';

const write = (plan: unknown): void => {
	root = mkdtempSync(join(tmpdir(), 'plan-test-'));
	mkdirSync(join(root, 'plan'));
	writeFileSync(join(root, 'plan', 'p.plan.json'), typeof plan === 'string' ? plan : JSON.stringify(plan, null, '\t'));
};
const run = (...args: string[]) => {
	const r = spawnSync('node', [cli, 'p', ...args], { cwd: root, encoding: 'utf8' });
	return { code: r.status, out: `${r.stdout}${r.stderr}` };
};
const read = () => JSON.parse(readFileSync(join(root, 'plan', 'p.plan.json'), 'utf8'));
const blocked = () => join(root, 'plan', 'p.blocked.md');
const t = (name: string, fn: () => void) => {
	fn();
	console.log(`ok  ${name}`);
};

t('flat plan still works', () => {
	write({ one: { s: 'first', d: 0, t: 'true' }, two: { s: 'second', d: 0, t: 'true' } });
	assert.match(run().out, /step 1\/2 {2}one/);
	assert.match(run('one').out, /step 2\/2 {2}two/);
	assert.equal(read().one.d, 1);
	assert.equal(run('two').out.trim().split('\n').pop(), '0');
});

t('nested plan prints ancestors and the full path', () => {
	write({
		a: { s: 'A', c: { b: { s: 'B', c: { c1: { s: 'C', c: { d: { s: 'deep work', d: 0, t: 'true' } } } } } } }
	});
	const o = run().out;
	assert.match(o, /step 1\/1 {2}a\.b\.c1\.d/);
	assert.match(o, /deep work/);
	assert.match(o, /\^ A/);
	assert.match(o, /done: {4}plan p a\.b\.c1\.d/);
});

t('refuses out-of-order and unknown steps', () => {
	write({ a: { s: 'A', c: { x: { s: 'X', d: 0, t: 'true' }, y: { s: 'Y', d: 0, t: 'true' } } } });
	assert.equal(run('a.y').code, 1);
	assert.match(run('a.y').out, /done in order/);
	assert.equal(run('nope').code, 1);
	assert.equal(run('x').code, 0);
	assert.equal(read().a.c.x.d, 1);
	assert.match(run('x').out, /already done/);
});

t('groups derive done from their children', () => {
	write({ a: { s: 'A', d: 0, c: { x: { s: 'X', d: 0, t: 'true' } } }, z: { s: 'Z', d: 0, t: 'true' } });
	assert.match(run().out, /step 1\/2 {2}a\.x/);
	run('x');
	assert.equal(read().a.d, 1);
});

t('t gate blocks the mark until it passes', () => {
	write({ one: { s: 'first', d: 0, t: 'exit 3' }, two: { s: 'second', d: 0, t: 'true' } });
	const r = run('one');
	assert.equal(r.code, 1);
	assert.match(r.out, /FAILED \(exit 3\)/);
	assert.match(r.out, /attempt 1\/3/);
	assert.equal(read().one.d, 0);
	writeFileSync(join(root, 'plan', 'p.plan.json'), JSON.stringify({ one: { s: 'first', d: 0, t: 'true' }, two: { s: 'second', d: 0, t: 'true' } }));
	assert.equal(run('one').code, 0);
	assert.equal(read().one.d, 1);
});

t('three failures block the plan and halt it', () => {
	write({ one: { s: 'first', d: 0, t: 'echo boom; exit 1' } });
	run('one');
	run('one');
	const r = run('one');
	assert.equal(r.code, 1);
	assert.match(r.out, /BLOCKED/);
	assert.ok(existsSync(blocked()));
	assert.match(readFileSync(blocked(), 'utf8'), /gate failed 3 times/);
	assert.match(readFileSync(blocked(), 'utf8'), /boom/);
	// every later invocation refuses to run at all
	assert.match(run().out, /is BLOCKED/);
	assert.equal(run().code, 1);
});

t('--block halts and hands the step back to the planner', () => {
	write({ one: { s: 'first', d: 0, t: 'true' } });
	const r = run('one', '--block', 'the api returns 404');
	assert.equal(r.code, 1);
	assert.match(r.out, /BLOCKED/);
	assert.match(readFileSync(blocked(), 'utf8'), /the api returns 404/);
	assert.equal(read().one.d, 0);
});

t('v gate stops a stale step before it runs', () => {
	write({ one: { s: 'first', d: 0, v: 'exit 1', t: 'true' } });
	const r = run();
	assert.equal(r.code, 1);
	assert.match(r.out, /STALE/);
	assert.match(readFileSync(blocked(), 'utf8'), /stale: v gate failed/);
	write({ one: { s: 'first', d: 0, v: 'true', t: 'true' } });
	assert.match(run().out, /step 1\/1 {2}one/);
});

t('a failing group gate does not undo the leaf', () => {
	write({ a: { s: 'A', t: 'exit 1', c: { x: { s: 'X', d: 0, t: 'true' } } } });
	const r = run('x');
	assert.equal(r.code, 1);
	assert.match(r.out, /group a is broken/);
	assert.match(r.out, /stayed done/);
	assert.equal(read().a.c.x.d, 1);
});

t('preamble prints with every step', () => {
	write({ _: 'ALWAYS: pnpm, never npm', one: { s: 'first', d: 0, t: 'true' }, two: { s: 'second', d: 0, t: 'true' } });
	assert.match(run().out, /ALWAYS: pnpm, never npm/);
	run('one');
	assert.match(run().out, /ALWAYS: pnpm, never npm/);
	assert.equal(read()._, 'ALWAYS: pnpm, never npm');
});

t('every undone leaf needs a gate', () => {
	write({ one: { s: 'first', d: 0 } });
	const r = run();
	assert.equal(r.code, 1);
	assert.match(r.out, /has no gate/);
	write({ one: { s: 'first', d: 0, t: '-' } });
	assert.equal(run().code, 0);
	assert.match(run('-l').out, /waive their gate/);
	// an already-done leaf keeps its history
	write({ one: { s: 'first', d: 1 }, two: { s: 'second', d: 0, t: 'true' } });
	assert.equal(run().code, 0);
});

t('completion archives the plan and keeps printing 0', () => {
	write({ one: { s: 'first', d: 0, t: 'true' } });
	assert.equal(run('one').out.trim().split('\n').pop(), '0');
	assert.ok(existsSync(join(root, 'wip-plans', 'p.plan.json')));
	assert.equal(run().out.trim(), '0');
	assert.match(readFileSync(join(root, 'plan', 'p.log'), 'utf8'), /\tone\t/);
});

t('rejects bad names, unknown fields, empty groups, dupes', () => {
	write({ '2nd': { s: 'x', d: 0, t: 'true' } });
	assert.match(run().out, /bad step name/);
	write({ ok: { s: 'x', d: 0, sc: {} } });
	assert.match(run().out, /unknown field "sc"/);
	write({ ok: { s: 'x', c: {} } });
	assert.match(run().out, /empty step group/);
	write({ ok: { d: 0, t: 'true' } });
	assert.match(run().out, /needs "s"/);
	write('{"a":{"s":"1","d":0,"t":"true"},"a":{"s":"2","d":0,"t":"true"}}');
	assert.match(run().out, /duplicate step\/field name "a"/);
	write('{"a":{"s":"has \\"a\\": inside","d":0,"t":"true"}}');
	assert.equal(run().code, 0);
});

t('list shows the tree and warns on missing v', () => {
	write({ a: { s: 'A', c: { x: { s: 'X', d: 1, t: 'true' }, y: { s: 'Y', d: 0, t: 'true' } } } });
	const o = run('-l').out;
	assert.match(o, /· a\n✓ {3}x \+t\n→ {3}y \+t/);
	assert.match(o, /1\/2 leaf steps done, max depth 2/);
	assert.match(o, /1 undone leaf steps have no "v"/);
	assert.match(o, /no top-level "_" preamble/);
});

console.log('\nall green');
