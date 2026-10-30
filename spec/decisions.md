# Decision Log (ADRs)

> Append-only. Never delete; supersede instead. The agent adds an entry whenever it makes or changes a non-obvious technical choice.

## Template
```
### ADR-NNN: <title>
- Date: YYYY-MM-DD
- Status: Proposed | Accepted | Superseded by ADR-XXX
- Context: why a decision was needed
- Options: A, B, C (with pros/cons)
- Decision: what we chose
- Consequences: trade-offs, follow-ups
- Related: feature / spec IDs
```

---

### ADR-001: Adopt the AI-native SDLC loop (spec-driven)
- Date: <today>
- Status: Accepted
- Context: AI-assisted coding needs durable, reviewable intent to avoid drift and rework.
- Decision: Work flows intent → spec → plan → tasks → build → verify → review → ship → monitor, each stage committing an artifact the next reads (`spec/workflow.md`).
- Consequences: Slight up-front cost; far fewer misunderstandings and a resumable project state.

### ADR-002: Approved execution model — local frontend development, cloud-hosted backend
- Date: 2026-10-30
- Status: Accepted (human-approved execution model)
- Context: The kit previously enforced "cloud-only development" (everything in a remote workspace), which
  incorrectly prohibited normal local frontend development on the approved workstation.
- Options: A) cloud-only remote workspace; B) local frontend development with cloud-hosted backend
  infrastructure; C) everything local including backend.
- Decision: Option B. OpenCode/VS Code, repository, Git/GitHub CLI and all frontend development, checks,
  builds and tests run locally on the user's MacBook. All backend infrastructure and backend services
  (databases, Redis/queues/workers, auth, storage, email, payments/webhooks, scheduled jobs) run in approved
  cloud environments; backend migrations target approved cloud dev/staging (production migrations need
  explicit human authorization and a documented recovery plan). Cloud CI repeats automated checks.
- Consequences: Scripts, agents, commands and specs no longer require a remote workspace. Local backend
  servers/databases/Redis/queues/Docker-based backend remain prohibited. The local frontend connects only to
  approved cloud dev/staging endpoints via environment configuration, separated per environment, with secrets
  kept out of source, logs and browser bundles. Missing cloud backend = blocker or loud skip, never local
  substitute infrastructure.
- Related: `AGENTS.md`, `spec/workflow.md`, `spec/testing.md`, `spec/stack.md`, `spec/platform-readiness.md`,
  `spec/governance.md`, `scripts/verify.sh`
