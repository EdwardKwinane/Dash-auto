# Workflow — gated production SDLC

The workflow is deliberately sequential at its gates. Agents prepare evidence and artifacts; the human owns
product decisions, design approval, high-risk approvals and production release.

```text
DISCOVER → DEFINE → PLATFORM READINESS → DESIGN → DESIGN QA/APPROVAL
   → ARCHITECTURE → PLAN → TASKS → BUILD → VERIFY → REVIEW → RELEASE → OPERATE
```

## Stages, artifacts and gates

| Stage | Command | Required output | Human gate |
|---|---|---|---|
| Discover | `/init`, `/intent` | product intent, scope, constraints | accept intent |
| Define | `/specify`, `/clarify` | behavior spec, FR/NFR/AC, exclusions | approve spec |
| Platform readiness | `/platform-audit` | official-doc register, skills/plugins/MCP/CLI/auth matrix, gaps | approve platform choices/access |
| Design first | `/design-sync` | Figma source inventory, design system, all screens and responsive variants, component map | approve complete design baseline |
| Design QA | `/design-review` | breakpoint, accessibility, consistency, flow and traceability report | approve design QA |
| Architecture | `/architecture` or `/plan` | architecture, ADRs, security/data/API/deployment plan | approve architecture/plan |
| Tasks | `/tasks` | small tasks with exact paths and AC mapping | approve task plan |
| Build | `/implement` or `/fix` | code, tests, docs, commits | per risk tier |
| Test | `/verify` | verification evidence and AC traceability | read report |
| Review | `/review` | independent bug/security/compliance review | human accepts findings |
| Release | `/ship` | PR/release/rollback plan | human merge + release authorization |
| Operate | `/incident`, `/triage`, `/sync` | telemetry, incident intents, lessons, handoff | human triage |

### Stage gates — entry, exit and stop conditions

| Stage | Entry conditions | Exit conditions (advance when) | Stop if |
|---|---|---|---|
| Discover | Regulatory/session docs read; repo inspected read-only | Human accepts product intent, scope, constraints | Scope, jurisdiction or data sensitivity unresolved |
| Define | Accepted intent | Human approves behavior spec with testable FR/NFR/AC | `[NEEDS CLARIFICATION]` items or untestable criteria remain |
| Platform readiness | Platform/candidates defined in spec | Official-doc register complete per platform; human approves choices/access | Official docs, auth or supported integration cannot be verified (mark Blocked) |
| Design | Approved spec; approved platform choices | Complete Figma design baseline extracted and inventoried (all required viewports) | No verified Figma file access, or any in-scope screen cannot be retrieved |
| Design QA | Complete baseline incl. 1440/1280/768/390/360 | QA report clean of blockers; human explicitly approves baseline + QA | Any required viewport missing, blocker open, or human approval absent |
| Architecture | Approved design baseline | Human approves architecture + ADRs + security/data/API/deployment plan | — |
| Plan | Approved architecture | Human approves component/feature plan(s) (risk tier recorded) | Platform or design prerequisite becomes invalid |
| Tasks | Approved plan(s) | Human approves task breakdown (small tasks, exact paths, AC mapping) | — |
| Build | Approved tasks; preconditions re-checked per component | Each task verified; work tree consistent | A precondition or approval is missing (stop and ask) |
| Verify | Implementation complete for the task | All ACs mapped to passing tests (local frontend / approved cloud backend) | An AC has no test, or backend-dependent checks are unverified/blocked without record |
| Review | `/review` run on the diff | Human accepts findings; no open Important severity | Author would self-approve (never permitted) |
| Release | Verify + review clean | Human merges; release authorized (`RELEASE_APPROVAL`) | No explicit human release authorization |
| Operate | Breach/incident detected | Intent triaged ("fix now"/"schedule"/"dismiss") | — |

Expected execution environment per stage output: see "Local frontend / cloud backend execution".

## Hard sequencing rules
1. Platform readiness must precede platform-dependent execution. Before a service is used, inspect its official
   developer portal/docs, current API/SDK references, authentication guide, CLI and MCP documentation, limits,
   pricing/free-tier and terms/licensing where relevant. Record sources and verification date.
2. Figma is the design source of truth. Retrieve all relevant pages, frames, components, variables, styles,
   assets, prototypes and annotations through the connected Figma integration to the extent the API permits.
   Record any inaccessible/unsupported content explicitly; never silently omit it.
3. Complete the design system and every in-scope screen before application coding. Include desktop, laptop,
   tablet and mobile; do not merely scale desktop. The responsive design baseline must be human-approved.
4. Design sync and design QA are required again whenever a UI change affects an approved design.
5. Each component is planned before it is built: spec/AC, variants, responsive behavior, states, accessibility,
   data contract, error handling, security, tests and dependencies.
6. No implementation during discovery, specification, platform audit, design, design QA or architecture/plan.
7. No stage advances without the prior human gate. Tier 0 exceptions cannot bypass the design-first gate for
   product UI or the security/platform gates for relevant changes.

## Platform readiness protocol
For every selected platform/service, the agent must:
- Identify official developer portal and docs; read relevant getting-started, API/SDK, auth, limits, security,
  deployment and migration pages. Prefer current official docs over blogs or model knowledge.
- Inspect available OpenCode skills, plugins/connectors, MCP servers and CLI integrations. Read required skill
  instructions before tool use. Do not assume a tool exists; discover it.
- Check installed CLI version and supported commands using official install docs and `--help`/version commands —
  verified in the CLI's actual intended execution environment (local workstation, cloud CI or cloud provider
  environment). Record which environment each CLI is intended to run in.
- Check auth state with the platform's documented non-secret status command. If login is needed, ask the human
  to complete browser/device OAuth. Never request a secret in chat or display credential values.
- Validate MCP connection and tool schemas with a harmless read-only operation before relying on it.
- Record platform, purpose, intended execution environment, docs URLs, doc date/version, CLI version/status,
  skill/plugin/MCP status, auth status (authenticated / needs human / unavailable), quotas/pricing, risks,
  evidence and unresolved items.
- Re-check docs and compatibility before upgrades or implementation if the platform changes or docs are stale.
- If no official docs, auth, API or supported integration can be verified, mark blocked and propose alternatives.

## Local frontend / cloud backend execution

The user's MacBook is the approved local development workstation. Execution is split by where work runs:

**Runs locally (approved):**
- OpenCode and VS Code, repository editing and source control, Git and GitHub CLI, local branches and worktrees.
- Frontend dependency installation, frontend dev server, frontend linting/formatting/type checking and builds.
- Frontend unit/component tests, browser-based frontend tests, frontend mock data/fixtures and isolated test
  utilities.

**Runs in cloud CI (automated repeats):**
- The above frontend checks on pull requests via `.github/workflows/`, agent evals, dependency/security audits.

**Runs only against approved cloud-hosted backend environments (dev/staging/production):**
- Backend APIs and server-side services; PostgreSQL and other databases; Redis, message brokers, queues and
  background workers; authentication/identity services; object/file storage; email; payment integrations and
  webhook endpoints; scheduled jobs and durable execution; backend monitoring, logging, backups and recovery;
  backend deployment and migrations (migrations target approved cloud dev/staging; production migrations need
  explicit human authorization and a documented recovery plan).

| Operation | Environment |
|---|---|
| OpenCode, VS Code, repo editing, Git/GitHub CLI, local branches and worktrees | Local Mac |
| Frontend development, dev server | Local Mac |
| Frontend builds, lint/format/typecheck, unit/component/browser tests | Local Mac / Cloud CI (CI repeats) |
| Backend APIs and server-side services | Cloud |
| Databases (PostgreSQL etc.) | Cloud |
| Authentication | Cloud |
| Storage | Cloud |
| Queues, background workers, schedulers, durable execution | Cloud |
| Backend migrations | Cloud development/staging (approved) |
| Production migrations | Cloud, explicit human authorization + documented recovery plan |
| Deployment (backend) | Cloud CI/platform, approval-gated for production |
| Monitoring, logging, backups, recovery | Cloud |

Rules:
- Backend integration tests must use approved cloud development/staging services or controlled test
  environments (e.g. a dedicated cloud test database), never a locally installed database/server. Frontend
  integration points use clearly labelled mocks/fixtures when cloud backend access is unavailable; never
  represent mocked responses as verified live backend behavior.
- If a needed cloud backend is missing or inaccessible, report it as a blocker or skip backend-dependent checks
  with an explicit reason. Never silently create local backend infrastructure as a substitute.
- Do not assume every test is remote or every test is local: classify each test by what it exercises (see
  `spec/testing.md`).
- Frontend↔backend runtime configuration must separate development, staging and production environments; keep
  secrets out of source control, logs, terminal output and browser bundles; only intentionally public
  configuration may use browser-exposed environment variables; server-only secrets must never reach frontend
  code.
- Never copy secrets into repository files. Do not create local Docker or database services for backend
  infrastructure.

## Build rules
- Plan first; name files, sequence, risks, alternatives and rollback.
- Tasks should be small (target ≤30 minutes), each with exact files, FR/AC references and a verifiable Done when.
- Test-first. Every AC maps to at least one automated test. UI work is compared against approved Figma frames.
- Frontend checks may run locally; cloud CI may repeat them on PRs. Backend-dependent checks require approved
  cloud development/staging environments — never a local backend server or database. A missing cloud backend is
  a reported blocker, not a prompt to stand up local infrastructure.
- Run `scripts/verify.sh` in its intended environment (frontend checks run locally; cloud-dependent parts run
  against approved cloud environments); do not skip checks silently or weaken them.
- Update plan in the same commit when approved implementation changes.
- Parallelize only independent tasks in separate (local) Git worktrees; shared files run serially.

## Release and maintain
- Independent `/review`; author never self-approves. Tier 2+ requires human diff review; Tier 3 is human-driven.
- Agents prepare but never authorize production release. Rollback and recovery must be documented and rehearsed.
- Monitoring findings become intent artifacts; agents do not change production directly.
- Every production incident adds a lesson and an agent eval.
