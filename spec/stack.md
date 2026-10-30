# Stack & Commands

> Filled by `/init`. The agent reads this before installing anything or running commands.
> Pin versions deliberately. Replace the defaults below with your choices.

## Stack
| Layer | Choice | Version | Notes |
|---|---|---|---|
| Language | TypeScript (strict) | | |
| Frontend | React + Vite / Next.js | | |
| Styling | Tailwind CSS + component library | | |
| Backend | Node (Fastify/Express/Nest) / Python (FastAPI) | | |
| Database | PostgreSQL | | |
| ORM / migrations | Drizzle / Prisma / SQLAlchemy | | |
| Auth | | | |
| Validation | Zod / Pydantic | | |
| Testing | Vitest / Jest / Pytest, Playwright (e2e) | | |
| Package manager | pnpm | | |
| CI | GitHub Actions | | |
| Hosting | | | |

## Repo layout
```
/apps/web        # frontend
/apps/api        # backend
/packages/shared # shared types, schemas
/spec            # this folder
```
<!-- Adjust to the real layout. Keep in sync. -->

## Commands (the agent runs these to verify work)
`scripts/verify.sh` wraps lint + typecheck + test + build and is the single feedback loop. Set its defaults (or env vars `LINT_CMD`, `TYPECHECK_CMD`, `TEST_CMD`, `BUILD_CMD`) to match the table below.

Execution model: **local frontend, cloud backend.** The commands below run **locally** only when they touch
frontend work; backend-dependent commands (`dev:all`, `db:migrate`, `db:seed`) run against approved cloud
dev/staging environments — never a locally installed backend, database, Redis or Docker-based backend infra.

| Task | Command | Where |
|---|---|---|
| Install | `pnpm install` | local |
| Dev (frontend) | `pnpm dev` (frontend only; connects to cloud dev backend) | local |
| Dev (all, incl. backend) | `pnpm dev` | approved cloud dev environment only — do not run locally |
| Lint | `pnpm lint` | local (repeated in cloud CI) |
| Typecheck | `pnpm typecheck` | local (repeated in cloud CI) |
| Unit/component tests | `pnpm test` | local (mocked fixtures only) |
| Integration tests | `pnpm test` | approved cloud dev/staging test services |
| E2E tests | `pnpm test:e2e` | local browser against approved cloud dev/staging backend |
| Build | `pnpm build` | local (repeated in cloud CI) |
| DB migrate | `pnpm db:migrate` | approved cloud dev/staging only (prod needs human authorization) |
| DB seed | `pnpm db:seed` | approved cloud dev/staging only, with non-production data |

## Environment
- Required variables are documented in `.env.example` (always keep it current).
- Separate dev/staging/production configuration; keep secrets out of source control, logs, terminal output and
  browser bundles. Only intentionally public configuration may use browser-exposed variables; server-only
  secrets must never reach frontend code.
- Local setup steps (frontend only; backend endpoints come from approved cloud dev/staging config):
  1. 

## Git workflow
- Official remote: `origin` → `https://github.com/EdwardKwinane/Dash-auto.git` (configured by the human; agents
  never add/replace remotes).
- Default branch: `main`. The SDLC governance baseline is the first commit on `main`, made only after human
  review/approval of the diff.
- Subsequent development: feature branches (`feat/<feature-id>-<slug>`) → pull request → human merge. The agent
  never merges its own work; no pushes without explicit human authorization.
- Commits: Conventional Commits, referencing intent/spec/plan IDs.
