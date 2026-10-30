# AGENTS.md — Production SDLC

This repository uses a gated, AI-native SDLC. Follow `spec/constitution.md`, `spec/workflow.md`,
`spec/governance.md`, `spec/platform-readiness.md`, and `spec/design-first.md`.
The audit trail is: intent → product/spec → platform readiness → Figma design sync → approved design
baseline → architecture/plan → tasks → code/tests → independent review → release → operations.

## Mandatory session start
1. Read `spec/progress.md`, active feature artifacts, `spec/constitution.md`, `spec/workflow.md`.
2. State current stage, active gate, risk tier, next permitted action and blockers in 3 lines.
3. Before using a platform, inspect its official developer documentation and record the exact docs/version/date
   in `spec/platform-readiness.md` or the feature's platform register. Do not rely on model memory.
4. Use platform-specific installed skills, plugins, MCP servers and CLIs where available. Discover their
   installed capabilities first; read skill instructions before invoking relevant tools.
5. Verify CLI installation/version and authentication status using documented safe commands. Never print,
   read, paste, commit or expose credentials. If authentication requires user interaction, pause and ask the
   human to complete the official login flow. Do not attempt to bypass MFA, OAuth consent or access controls.

## Non-negotiable gates
- **Local frontend, cloud backend:** the user's MacBook is the approved local development workstation. OpenCode
  and VS Code run locally; repository editing, Git, frontend dependency installation, the frontend dev server,
  frontend lint/format/typecheck/builds, frontend unit/component/browser tests, frontend mocks/fixtures and local
  Git worktrees all run locally. Cloud CI may repeat these checks. All backend infrastructure and backend services
  run in approved cloud environments (APIs/services, PostgreSQL and other databases, Redis/message brokers/queues/
  workers, auth/identity, object storage, email, payment integrations and webhooks, scheduled jobs and durable
  execution, backend monitoring/backups/recovery, backend deployments and migrations — migrations target approved
  cloud dev/staging; production migrations need explicit human authorization and a documented recovery plan).
  Never run a local backend API/server/runtime, local PostgreSQL or other backend database, local Redis/broker/
  queue, Docker-based local backend infrastructure, local auth services, object-storage emulators standing in for
  the real cloud service, or local backend workers/schedulers. This prohibition does not restrict local frontend
  development or frontend testing. The local frontend connects only to approved cloud development/staging backend
  endpoints via environment configuration — never to production services/data without separate authorization.
- **Design first:** the complete Figma design system and all required screens are the first product deliverable.
  Pull/inspect the actual Figma source through the approved Figma MCP/API integration. Do not recreate designs
  from memory or use screenshots as the only source when structured Figma data is available.
- **No application implementation until design approval:** complete responsive designs for desktop, laptop,
  tablet and mobile; sync them from Figma; produce a screen/component inventory and traceability map; run
  design QA; obtain explicit human approval. No app component, route, schema, API or migration may be built
  before this gate. Design tooling and design documentation work are allowed.
- **Plan before every component:** each component/feature needs approved intent/spec, architecture-aware plan,
  UI states, responsive behavior, data/API contracts, accessibility, security, tests and task breakdown.
  No opportunistic component coding.
- No code without approved spec + plan + tasks and all preceding gates.
- Classify every change by risk tier. Tier 2+ requires human plan and diff review; Tier 3 is human-driven.
- Unknowns become `[NEEDS CLARIFICATION: ...]`; recommend a default and stop where the gate requires.
- One task at a time; smallest reversible change; test first; verify locally for frontend work and against approved
  cloud dev/staging backend environments for backend-dependent work.
- Never invent APIs, packages, CLI flags, MCP tools, quotas, compatibility or authentication status. Verify in
  official docs and the installed tool's own help/schema.
- Never read/print secrets. No production deploys, force pushes, destructive operations or live data mutations
  without explicit human authorization.
- If stuck after two failed attempts, stop and report exact evidence and the next safe options.

## Keep specs alive
Task done → tick tasks + progress. Schema → data-model. API → api-contracts. New dependency/platform/CLI →
stack + platform register + ADR. UI/design change → Figma source links + design baseline + responsive coverage.
Non-obvious choice → decisions. End every session with `/sync`.

## Definition of done
Approved ACs met; tests pass (frontend checks locally, backend-dependent checks against approved cloud
dev/staging environments); responsive UI matches approved Figma; accessibility/security checks pass;
`scripts/verify.sh` green in its intended environment; independent review clear; docs and traceability current;
commit references IDs.

## Things agents get wrong here
- Never start application coding before the Figma design baseline is complete and explicitly approved.
- Never treat desktop-only Figma frames as a responsive design; obtain approved tablet and mobile variants.
- Local frontend development, dev-server usage and frontend builds/tests are permitted and expected on the local
  workstation — but never run backend infrastructure or backend services locally (no local backend servers,
  databases, Redis, queues, Docker-based backend, auth services, storage emulators or backend workers).
- Never connect local development to production services or production data; use approved cloud dev/staging
  endpoints via environment configuration, and label mocks/fixtures clearly as mocks.
- Never assume a platform CLI/MCP is authenticated because it is installed; verify safely.
- Never implement a component before its own approved plan and task.
