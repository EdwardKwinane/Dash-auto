# Security

> Read before touching auth, input handling, secrets, uploads, or third-party calls.

## Baseline rules
- **Validate** all external input at the boundary with schemas; **encode** all output.
- **AuthN/AuthZ:** check authorization on the server for every request (never trust the client); deny by default.
- **Passwords:** hashed with Argon2id/bcrypt; never logged. Prefer a vetted auth library/provider over custom code.
- **Sessions/tokens:** httpOnly + secure + sameSite cookies where applicable; short-lived access tokens; rotate refresh tokens.
- **Secrets:** env vars / secret manager only; `.env` git-ignored; rotate on exposure.
- **Database:** parameterized queries only; least-privilege DB user.
- **CSRF / CORS / headers:** explicit CORS allowlist; CSRF protection for cookie auth; CSP, HSTS, X-Content-Type-Options.
- **Rate limiting** on auth and expensive endpoints.
- **Uploads:** type/size limits, scan if applicable, never serve from the app origin unsanitized.
- **Dependencies:** lockfile committed; run audit in CI; avoid abandoned packages.
- **Logging:** no PII, tokens, or secrets in logs.

## Roles & permissions
| Role | Can | Cannot |
|---|---|---|

## Threat notes (STRIDE-lite)
| Asset | Threat | Mitigation | Status |
|---|---|---|---|

## Compliance
- Applicable regimes (GDPR/POPIA/HIPAA/PCI...): 
