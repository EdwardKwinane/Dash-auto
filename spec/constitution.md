# Constitution

Non-negotiable rules. Only the human edits this file. Keep it short; it is loaded into every session.

## Engineering principles
1. **Spec first.** No feature code without an approved spec, plan, and tasks.
2. **Tests prove behavior.** Every acceptance criterion maps to at least one automated test.
3. **Simple beats clever.** Choose the boring, maintainable solution. No speculative abstractions.
4. **Small, reversible steps.** One task, one commit, always in a working state.
5. **Types everywhere.** Strict typing; no `any` / untyped escapes without a comment justifying it.
6. **Explicit errors.** No swallowed exceptions. Errors are typed, logged, and mapped to safe user messages.
7. **Secure by default.** Validate at the boundary, least privilege, no secrets in code or logs.
8. **Observable.** Structured logs and meaningful error context for every backend path.
9. **Accessible.** UI meets WCAG 2.2 AA basics (keyboard, contrast, labels).
10. **Documented decisions.** Anything non-obvious gets an ADR in `decisions.md`.

## Code standards
- Follow the formatter/linter config in the repo; never bypass it.
- Functions do one thing; prefer pure functions; keep files focused (< ~300 lines).
- Naming: clear and descriptive; no abbreviations beyond common ones (id, url, db).
- Comments explain *why*, not *what*.

## Process standards
- Conventional Commits. Never commit to `main` directly if a branch workflow is defined in `stack.md`.
- Dependencies: minimal, maintained, license-compatible; justify additions in `decisions.md`.
- Migrations are forward-only and reviewed; never edit an applied migration.

## Absolute prohibitions
- No secrets, tokens, or PII in the repo, logs, or test fixtures.
- No disabling security checks, tests, or type checks to "get green".
- No destructive operations without explicit human approval.
- No fabricating APIs, package names, or results.

## Amendments
| Date | Change | Reason |
|---|---|---|
