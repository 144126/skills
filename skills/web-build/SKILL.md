---
name: web-build
description: Build Ed's websites and webapps with SvelteKit, TypeScript, pnpm, and Cloudflare. Use Qdrant when a database is needed. Use for new sites, landing pages, and webapps, or when Ed asks to use his usual web stack.
---

# Web build

- Build only what the request needs. Keep an existing project's stack unless asked to change it.
- Before product, naming, or design choices, read `~/ed.md` if present. Only on Ed's personal machine, read `~/me.md` if present for project names, paths, lowercase UI text, Svelte runes, Tailwind, fonts, and auth defaults. Else use the user's or team's conventions.
- Use SvelteKit, TypeScript, and pnpm. Start new projects with `pnpm dlx sv create <path> --template minimal --types ts --install pnpm`. Add prettier, eslint, playwright, tailwindcss, and the Cloudflare adapter through `pnpm dlx sv add`.
- Use `@sveltejs/adapter-cloudflare` for Cloudflare hosting. Follow the current [SvelteKit Cloudflare setup](https://svelte.dev/docs/kit/adapter-cloudflare); use the existing Workers or Pages target when present.
- Add Qdrant only when the app needs a database. Keep Qdrant calls and credentials on the server. Use an existing instance when available; follow the current [Qdrant docs](https://qdrant.tech/documentation/). Add search by meaning only when the request needs it.
- Keep database access in `src/lib/server/`. Keep each business rule in one owning module; routes call it and components display its results. Validate input and check access on the server.
- Follow the repo's design system and code rules. Use `creative` and `ui-ux` for design choices when available.
- Keep secrets out of browser code and git. Ignore `.env` and `.dev.vars`.
- Reuse a running dev server. If `.log` exists, check it before diagnosing server problems and after changes. Run the project's type check, build, and tests relevant to the change. View UI changes with an available browser tool before saying done; prefer `agent-browser` when installed.
- Ask before deployment or irreversible remote data changes unless already authorized. Commit and push only when requested.
