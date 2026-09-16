
## This app — a Wix Headless frontend

A Wix-managed Astro frontend for a live Wix site; `wix.config.json` identifies the site. Built on
the **bookings** Wix business solution — more can be added to this same app. **The Wix site
owns the content and commerce** — read and write it through the Wix APIs, never hardcode what
it holds.

The Wix skills are installed at `.agents/skills/` — read them from that exact path:

- **`wix-headless-fast`** — the code already deployed in `src/` and how to extend it. Every
  business solution it ships sits under `references/<solution>/`: `INSTRUCTIONS.md` is that
  solution's playbook, `seed/` creates its content. To add one to this app, run from the
  project root:
  `node .agents/skills/wix-headless-fast/install/deploy.mjs <solution> --stack astro`
- **`wix-docs`** — the Wix API reference. Confirm any endpoint, request shape, field, or enum
  here before writing code against it, frontend or backend. Never infer a contract from
  generated SDK types or `node_modules`.
- **`wix-manage`** — recipes for managing the live site itself, as opposed to changing this
  codebase. No recipe for the task? Fall back to `wix-docs`.
