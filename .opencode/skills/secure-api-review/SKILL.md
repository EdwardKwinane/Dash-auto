---
name: secure-api-review
description: Apply the project API security standard. Use whenever creating or modifying an endpoint, route handler, auth logic, webhook, file upload, or reviewing API code or an API spec.
---
# Secure API review

For every endpoint you create or change, check and state the result in your summary:
1. **AuthN**: requires authentication unless explicitly public and listed in `api-contracts.md`; health checks only.
2. **AuthZ**: server-side ownership/role check on every resource access (no IDOR); deny by default.
3. **Input**: validated against a shared schema at the boundary; unknown fields rejected; sizes bounded.
4. **Output**: no internal errors, stack traces, or fields tagged PII/secret in responses or logs.
5. **State changes**: idempotency where retries are possible; audit event with actor, action, entity, time.
6. **Abuse**: rate limiting on auth and expensive routes; CSRF protection for cookie sessions; explicit CORS allowlist.
7. **Data**: parameterized queries only; least-privilege DB access; migrations reviewed.
8. **Contract**: `api-contracts.md` updated; error format matches the standard.

Anything you cannot satisfy → list it under "Flagged concerns" for the human. See `spec/security.md`.
