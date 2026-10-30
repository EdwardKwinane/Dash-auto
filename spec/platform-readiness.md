# Platform Readiness Register

Status: **Required before implementation**. This register is evidence-based; never mark a platform ready from
memory or because a CLI appears installed.

## Audit queue (from ADR-003 + Discover session, 2026-10-30 — all statuses Provisional)
`/platform-audit` evaluates and fills the register for: Figma (MCP/API access verification — file
`12LxdrHAdf5Djzr5UhpmiZ` under EdwardKwinane), source control (GitHub `origin`, `gh` auth for EdwardKwinane),
local workstation tooling (OpenCode v2.2.0, pnpm/node versions), cloud CI (GitHub Actions incl.
runner↔backend permissions), backend provider options per ADR-003 comparison (Vercel+Supabase / Vercel+Neon+
Cloudflare R2 / AWS), auth options (with backend evaluation), email providers (Resend / SES / other free-first),
and the reserved (future-only) AI seam (OpenRouter + Vercel AI Gateway — included only for future architecture-seam assessment; no AI account configuration, API keys, model integration, provisioning or implementation is authorized during the MVP platform audit). Nothing is provisioned during the audit;
zero-cost-first; findings require official-doc sources + verification dates.

## Required audit record (duplicate per platform)
| Field | Evidence |
|---|---|
| Platform / purpose / environment | |
| Intended execution environment of its tooling | local workstation / cloud CI / cloud provider environment |
| Official developer portal + docs URLs | |
| Relevant docs read (API/SDK, auth, CLI, MCP, security, limits, deployment) | |
| Docs version / last updated / checked date | |
| Selected skills and skill instructions read | |
| Plugin/connector available and permission scope | |
| MCP server connected; harmless read-only test and result | |
| CLI installed? correct version? authenticated? permissions granted? read-only test passed? (separate checks) | |
| CLI verified in its actual intended execution environment | |
| Authentication status (never record token/key) | |
| Human action needed (OAuth, consent, MFA, billing) | |
| Current quotas, free-tier limits, pricing and commercial restrictions | |
| Data residency, privacy, retention and licensing notes | |
| Risks, alternatives, open questions | |
| Status: Ready / Conditional / Blocked | |

## Audit requirements
- Audit every platform actually selected in `spec/stack.md`, including Figma, source control, the local
  workstation tooling, cloud CI and every selected backend platform (hosting/runtime, database, redis/queues,
  object storage, auth, email, payments, analytics/monitoring, AI/model providers and external APIs).
- Distinguish local developer tooling from cloud backend services. A local CLI (e.g. Git, GitHub CLI) used for
  local frontend work is not a backend service and does not require a remote cloud development workspace.
  Do not require a remote cloud development workspace unless one is explicitly selected for a specific purpose
  (and then audit it as its own platform entry).
- Consult official docs for the exact feature being used. Blogs and videos may supplement, not replace them.
- Check platform-specific installed skills/plugins/MCP/CLI; do not invent integrations or CLI commands.
- **AUDIT SAFETY RULE: audit activities are read-only wherever possible. Do not create cloud resources,
  enable paid services, deploy, change account settings, configure production integrations or modify Figma
  designs without separate explicit human approval.**
- Treat each readiness dimension as a **separate check** — never infer one from another:
  1. Installed.
  2. Correct version.
  3. Authenticated.
  4. Required permissions granted.
  5. Harmless read-only operation successfully tested.
- Authentication is a status check only. The human performs interactive login and grants permissions.
- Use least-privilege scopes. Separate dev/staging/prod identities and secrets. No production credentials in
  the agent workspace unless explicitly justified and approved.
- **SCOPE RULE: every readiness decision must state its intended scope (e.g. local development, cloud CI,
  development/staging backend, production). Readiness for one scope does not imply readiness for another.**
- Record exact limits and whether a free plan permits the intended commercial use. A free tier is not a
  production SLA. Re-check at launch.
- A platform with unresolved critical compatibility, licensing, security or auth questions is Blocked.

## Readiness gate
The Architect produces a complete register and a decision summary. Human approves the selected platform set,
required account setup and any paid/usage-based exposure before design/build depends on them.
