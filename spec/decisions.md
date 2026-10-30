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

### ADR-003: Defer cloud provider selection to an evidence-based platform audit
- Date: 2026-10-30
- Status: Accepted (posture); Selection: Open (decides at `/platform-audit`, human-approved)
- Context: Dash-auto is a zero-cost-first portfolio demonstration with a global-facing privacy posture
  (GDPR-principles baseline, adaptable e.g. POPIA). Locking a provider before evidence risks free-tier expiry,
  regional residency gaps and rework.
- Options: A) premature lock-in; B) evidence-based comparison then human-approved selection.
- Decision: Option B. At `/platform-audit`, compare — (1) Vercel + Supabase; (2) Vercel + Neon + Cloudflare R2 +
  queue/background service; (3) AWS (RDS PostgreSQL, Cognito, S3, SES + queue/worker services) — against:
  free-tier limits/expiry, regional availability/residency, PostgreSQL compatibility, auth/RBAC, object storage +
  image delivery, queues/background jobs/durable execution, AI/agentic readiness (future), DX/CLI/MCP/automation
  support, deployment/observability/backups/DR, lock-in and migration cost, production scalability, current
  pricing. All findings verified against official documentation/pricing with sources + verification dates recorded
  in `spec/platform-readiness.md`. Auth (incl. provider-auth vs Clerk vs custom sessions) evaluated alongside the
  backend provider. Email compared (Resend, AWS SES, other credible free-first providers) with SPF/DKIM/DMARC,
  quotas, webhooks, domain-verification dependencies documented.
- Consequences: Nothing is provisioned before approval; synthetic data and sandbox integrations only; no paid
  resources; provider rows remain `[Provisional]` in `stack.md`; the three options and their criteria are the
  mandated evidence checklist.

### ADR-004: Modular payment, email and AI service seams (MVP v1 boundaries)
- Date: 2026-10-30
- Status: Accepted
- Context: MVP v1 explicitly excludes real payments and defers email/AI provider selection, but the marketplace
  domain must not later be rewritten around whichever vendors are eventually chosen.
- Decision: (1) Payments — v1 has no PSP: clearly labelled mock checkout/reservation flows, synthetic data, no PSP
  keys or webhooks, no real card/banking data; a simulated reservation is never presented as a confirmed
  commercial transaction. Future PSP integration goes through a modular payment abstraction (separate spec,
  security review, plan and approval). (2) Email — transactional email is a modular backend service (enquiry
  confirmations, seller onboarding, listing status, admin notifications) replaceable without changing business
  logic. (3) AI — agentic features are documented future capabilities behind reserved seams; each requires its
  own spec → platform evidence → plan → approval before implementation.
- Consequences: No PSP/provisioning during MVP v1; platform audit documents mock-payment boundaries and future
  integration requirements; reviews check that domain logic never imports vendor SDKs directly.
