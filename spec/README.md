# spec/ — Project memory and source of truth

Read `workflow.md` first. The mandatory order is intent/spec → platform audit → Figma design sync + responsive
design QA + human approval → architecture/plan/tasks → implementation.

| File | Purpose |
|---|---|
| `workflow.md` | SDLC stages, gates and commands |
| `constitution.md` | Non-negotiable engineering rules (human-owned) |
| `governance.md` | Risk tiers, approvals and controls |
| `platform-readiness.md` | Official docs, skills/plugins, MCP, CLI and auth evidence |
| `design-first.md` | Figma extraction, responsive design and approval standard |
| `product.md`, `architecture.md`, `stack.md` | Product, boundaries and approved tools |
| `security.md`, `testing.md`, `operations.md` | Security, verification and production operations |
| `ui-guidelines.md` | UI tokens, accessibility and component conventions |
| `data-model.md`, `api-contracts.md` | Authoritative data and API contracts |
| `decisions.md`, `lessons.md`, `metrics.md` | ADRs, incidents and metrics |
| `progress.md` | Live handoff state |
| `features/NNN-slug/` | Intent, spec, design baseline, plan, tasks and release artifacts |

## First-time setup
1. Place the kit in the repository root and commit it.
2. Confirm the local workstation: OpenCode and VS Code run locally; frontend dependency installation, the
   frontend dev server, frontend checks/builds/tests and local Git worktrees are permitted locally.
3. Authenticate platform CLIs/MCPs through official interactive flows (Figma, GitHub, etc.) on the machine(s)
   where their tooling runs.
4. Provision and verify the approved cloud backend environments (dev/staging) when backend work begins; backend
   infrastructure and services are never run locally.
5. Run `/init`, `/intent`, `/specify`, `/clarify`, `/platform-audit`, `/design-sync`, `/design-review`.
6. Obtain explicit human approval of the responsive Figma baseline before `/plan`, `/tasks` or `/implement`.

## Commands
`/platform-audit` → `/design-sync` → `/design-review` → `/plan` → `/tasks` → `/implement` → `/verify`
→ `/review` → `/ship` → `/sync`.
