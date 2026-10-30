# Architecture

> Filled by `/init`, refined by `/plan`. Describe structure and boundaries, not every file.
> **Status: DRAFT — awaiting human approval. Execution topology is FIXED (ADR-002); provider/hosting details are
> provisional pending `/platform-audit` (ADR-003).**

## System overview
```mermaid
flowchart LR
  Browser[Browser] --> Web[Web app /apps/web — local frontend dev]
  Web -->|REST over env-configured HTTPS API URL (not /apps/api locally)| API[Backend API /apps/api — proposed path — cloud only]
  API --> DB[(PostgreSQL — cloud-hosted, provider TBD at platform-audit)]
  API --> P[Cloud object storage]
  API --> Q[Cloud queues / background jobs]
```

## Modules / bounded contexts
| Module | Responsibility | Depends on | Path |
|---|---|---|---|
| identity | registration, login, sessions, RBAC (customer/seller/admin) | provider auth (TBD) | TBD with backend shape |
| listings | vehicle & listing lifecycle: draft → submitted → approved/rejected | listings data | TBD |
| catalog | customer-facing browse/search/filter/detail aggregates | listings | TBD |
| favourites | saved vehicles, user wishlist/favourites collection | catalog | TBD |
| enquiries | customer enquiry submissions, status tracking, confirmation flow | identity, listings | TBD |
| reservations | test-drive and reservation requests, status lifecycle | identity, listings | TBD |
| media | secure image upload pipeline → cloud storage (no local storage emulation) | storage provider (TBD) | TBD |
| notifications | enquiry confirmations, seller onboarding, listing status, admin alerts | email provider (TBD) | TBD |
| admin | approval queue, seller/customer management, audit trail | listings, identity | TBD |
| checkout-mock | clearly labelled simulated reservation flow (no PSP) — v1 mock only | listings, reservations | TBD |

## Layering rules
- UI → API client → routes → services → repositories → DB. No skipping layers.
- Shared types/schemas live in one place (`packages/shared` [Provisional]) and are imported, never duplicated.
- Business logic lives in services, never in route handlers or components.
- Frontend runtime code never holds server-only secrets; backend services authenticate via cloud-injected env.
- `apps/api` [Provisional] is the proposed backend repository path — the boundary is the env-configured HTTPS
  API URL consumed by the frontend, which must not assume that path until deployment topology is approved.

## Cross-cutting concerns
- **Auth & authorization:** RBAC, deny by default, server-side checks on every request (roles: customer, seller,
  admin; listing-ownership checks on seller actions). Provider TBD at `/platform-audit`.
- **Validation:** Zod schemas at every boundary (provisional).
- **Error handling:** typed errors mapped to the API error format (`api-contracts.md`).
- **Logging/observability:** structured logs, request IDs; backend observability lives with the cloud provider
  (never local).
- **Config:** env-based, validated at startup; separate dev/staging/prod configuration; no secrets in Git, logs,
  terminal output or browser bundles.
- **Background jobs / queues:** cloud-hosted only; used for email, media processing, status notifications.
- **Caching:** CDN-backed image delivery; decision on app caching deferred to plan stage.
- **Audit trail:** admin actions (approve/reject listings, customer/seller management) must persist actor, action,
  entity, timestamp.
- **Abstraction seams (ADR-004):** payments (mock only in v1), email provider, AI (future) — all must remain
  swappable service boundaries behind interfaces; no marketplace logic coupled to a specific PSP/email/AI vendor.
- **Future AI (documented only):** conversational discovery, listing assistance, enquiry triage, admin workflow
  agents — reserved seams; never implemented before their own spec/plan/approval.

## Deployment topology
<!-- Provider details pending ADR-003 evidence; the environment policy is fixed: -->
- **Local Mac (this workstation):** OpenCode/VS Code, `/apps/web` dev server, frontend lint/typecheck/build/test,
  mocks/fixtures; connects only to approved cloud dev/staging endpoints.
- **Cloud CI (GitHub Actions):** repeats frontend checks on PRs; agent evals; dependency/security audits; no
  backend access without configured permissions/secure networking.
- **Cloud dev/staging/production:** backend API, PostgreSQL (TBD provider), auth, storage, queues/workers, email
  provider (TBD), monitoring/backup/recovery. Migrations target cloud dev/staging; production migrations need
  explicit human authorization + documented rollback.
- Parked decision: hosting/design shape re-evaluated at `/platform-audit`; nothing provisioned until approved.

## Known constraints & tech debt
- All backend provider rows provisional until the evidence-based comparison is approved.
- Image pipeline, search implementation and pagination strategy unspecified by design — defined per-feature at
  plan stage against the approved Figma baseline (e.g. search UX may inform data-model/indexing decisions).
