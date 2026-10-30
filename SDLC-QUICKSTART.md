# Dash-auto SDLC Quickstart

**Do not start coding immediately.** This kit is designed to make the first deliverables platform readiness and
the complete approved Figma design baseline.

## Approved execution model

**Local frontend development, cloud-hosted backend infrastructure.**

- The user's MacBook is the approved local development workstation. OpenCode and VS Code run locally, as do
  repository editing, Git, frontend dependency installation, the frontend dev server, frontend
  lint/format/typecheck/builds, frontend unit/component/browser tests, frontend mocks/fixtures and local Git
  worktrees.
- All backend infrastructure and backend services run in approved cloud environments: APIs/services, databases,
  Redis/queues/workers, auth, object storage, email, payments/webhooks, scheduled jobs, monitoring/backup and
  backend deployment/migration. Cloud CI may repeat automated checks.
- Never run a local backend server, database, Redis, queue, Docker-based backend or auth service. The local
  frontend connects only to approved cloud dev/staging backend endpoints via environment configuration — never
  to production without separate authorization.

## Required order
1. Inspect the local workstation and repository (tools installed, versions, Git state, repo structure) — read-only.
2. `/init` — define product, jurisdiction, source-of-truth and governance; record the local/cloud execution model.
3. `/intent` → `/specify` → `/clarify` — agree what to build and testable acceptance criteria.
4. `/platform-audit` — verify official docs, skills/plugins, MCP, CLI and safe auth status for every selected
   platform, in its intended execution environment (local workstation, cloud CI or cloud backend provider).
5. `/design-sync` — pull all in-scope Figma pages/frames/components/variables/assets/prototypes through the
   connected Figma MCP/API integration.
6. Complete missing responsive Figma designs (desktop 1440 / laptop 1280 / tablet 768 / mobile 390 / small
   mobile 360) — as explicit design tasks, never invented from memory.
7. `/design-review` — QA and obtain explicit human approval of the design baseline.
8. Only then: architecture/plan → tasks → implementation → verify → review → release.
9. Independent review (`/review`) and the human release gate close the loop.

## Stop conditions
Stop if the approved backend platform or Figma access is not verified; platform docs or auth are unverified;
responsive designs are incomplete; design QA has blockers; a needed cloud backend is unavailable (never
substitute local backend infrastructure for it — mark backend-dependent checks blocked with an explicit reason);
or human approval is absent.
