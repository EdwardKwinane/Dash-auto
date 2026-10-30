# Review Instructions

Used by the `reviewer` agent (`/review`) and any CI review job. Findings never approve or block a PR alone; a human approves.

## Passes (tag each finding with its pass)
1. **Bugs** — logic errors, broken edge cases, race conditions, subtle regressions, error handling.
2. **Security** — authN/authZ gaps, injection, unvalidated input, secrets or PII in code/logs, unsafe deps. Apply `.opencode/skills/secure-api-review`.
3. **Compliance** — does the diff match `spec.md` acceptance criteria, `plan.md`, `constitution.md`, `api-contracts.md`, `data-model.md`? Report spec drift and untested ACs. Also check the approved execution model: backend infrastructure/services must never be introduced or started locally (servers, databases, Redis, queues, Docker-based backend, auth services, storage emulators, workers); frontend work must not connect to production services/data; any mocked responses must not be presented as verified live backend behavior.

## Severity
- **Important** — breaks behavior, leaks data, breaches policy, or an AC has no test.
- **Should fix** — maintainability, a11y, performance, weak error handling.
- **Nit** — style. Report at most 5; summarize the rest as a count.

## Risk-tier check
State the change's tier (`spec/governance.md`). If Tier 2+, say what a human must look at personally.

## Do not report
Generated files, formatting that the linter already enforces, anything CI already checks.

## Output
Findings ordered by severity with `file:line`, then **Spec drift**, then **Verdict** (APPROVE / CHANGES REQUESTED) and what you did NOT verify.
