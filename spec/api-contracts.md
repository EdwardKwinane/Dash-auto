# API Contracts

> Source of truth for every interface between client and server (and between services). Update BEFORE implementing a change.

## Conventions
- Style: REST/JSON (or tRPC / GraphQL — state it here): 
- Base path & versioning: `/api/v1`
- Auth: `Authorization: Bearer <token>` / session cookie (state which)
- Dates: ISO 8601 UTC. IDs: strings. Pagination: `?cursor=&limit=` → `{ items, nextCursor }`
- Idempotency: unsafe retries use `Idempotency-Key` where required.

## Standard error format
```json
{ "error": { "code": "VALIDATION_FAILED", "message": "Human-readable", "details": [{ "field": "email", "issue": "invalid" }], "requestId": "..." } }
```
| HTTP | code | When |
|---|---|---|
| 400 | VALIDATION_FAILED | Input invalid |
| 401 | UNAUTHENTICATED | Missing/invalid credentials |
| 403 | FORBIDDEN | Authenticated but not allowed |
| 404 | NOT_FOUND | Resource missing |
| 409 | CONFLICT | State conflict / duplicate |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL | Unexpected (never leak internals) |

## Endpoints

### `POST /api/v1/<resource>`
- **Feature:** `NNN-...`  **Auth:** required / public  **Roles:** 
- **Request:**
```json
{ }
```
- **Response 201:**
```json
{ }
```
- **Errors:** 400, 401, 409
- **Spec refs:** FR-00X, AC-00X

<!-- Copy per endpoint. -->

## Events / webhooks
| Event | Producer | Payload | Consumers |
|---|---|---|---|

## Change log
| Date | Change | Breaking? |
|---|---|---|
