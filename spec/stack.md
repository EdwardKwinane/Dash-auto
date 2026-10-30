# Stack & Commands

> Filled by `/init`. The agent reads this before installing anything or running commands.
> Pin versions deliberately. Replace the defaults below with your choices.
> **Status: DRAFT — awaiting human approval. Items marked [Provisional] are unverified and must pass
> `/platform-audit` (official docs, versions, quotas, auth) before anything is installed or provisioned.**

## Stack
| Layer | Choice | Version | Notes |
|---|---|---|---|
| Language | TypeScript (strict) | | Constitution rule 5 |
| Frontend | Next.js (App Router) [Provisional] | | Recommendation only; confirm at design/plan stage (vs React+Vite) — supports the responsive five-viewport UI + future server components. **Local Next.js development is frontend-only; it communicates with the cloud backend via an environment-configured HTTPS API URL. Local route handlers, server actions or server components must not become an unapproved local backend; any cloud-hosted frontend server-side execution requires explicit architecture approval.** |
| Styling | Tailwind CSS + component library [Provisional] | | Component library derived from approved Figma system, not chosen until design baseline |
| Backend | Node.js (TypeScript) runtime [Provisional] | | Host/shape (Functions/containers) decided with provider at `/platform-audit`. **`/platform-audit` must verify runtime compatibility, deployment model, background execution capabilities, operational constraints, cold-start characteristics and provider-specific limits before approval.** |
| Database | PostgreSQL | | Provider TBD at `/platform-audit` (ADR-003): Vercel+Supabase vs Vercel+Neon+R2 vs AWS RDS |
| ORM / migrations | Drizzle [Provisional] | | Verify at platform audit; migrations run only against approved cloud dev/staging |
| Auth | TBD at `/platform-audit` | | RBAC for customer/seller/admin; provider evaluated with backend choice |
| Validation | Zod [Provisional] | | Shared boundary schemas |
| Testing | Vitest (unit/component) + Playwright (e2e) [Provisional] | | Pyramid & environments per `testing.md` |
| Package manager | pnpm | | |
| CI | GitHub Actions | | Frontend CI uses mocks or approved non-production endpoints only; **no production credentials or production database access.** Backend deployment and migrations require separate authorization, approved workflows and explicit human sign-off — not the PR CI path. |
| Hosting | Frontend: Vercel [Provisional] · Backend/data: TBD at `/platform-audit` | | Zero-cost-first is a target, not a guarantee; free-tier quotas, expiry dates, bandwidth/storage/email/limits, background-execution caps, commercial-use restrictions must be evaluated; likely growth costs and production-approved provider require documented cost-benefit and human approval beyond free-tier usage. |
| AI (future seam) | OpenRouter + Vercel AI Gateway [Provisional, future-only] | | Documented future capabilities only (intelligent search, conversational discovery, listing assistance, enquiry triage, admin workflow agents); **no provider installation, API keys, provisioning or implementation as part of the MVP foundation — awaiting their own spec/plan/approval.** |
| Email | TBD at `/platform-audit` | | Candidates: Resend, AWS SES, other free-first providers; modular service per ADR-004 |
| Payments | **None in v1** | | Mock checkout only; PSP-free; modular payment abstraction per ADR-004 |

## Repo layout
```
/apps/web        # frontend (local development approved)
/apps/api        # backend (cloud-hosted only — never run locally)
/packages/shared # shared types, schemas
/spec            # this folder
```
<!-- Adjusted when the backend provider/deployment shape is approved. Keep in sync. -->

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
