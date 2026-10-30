---
description: DEPLOY. Prepare the release (PR text, notes, rollback). Never deploys to production itself.
agent: builder
---
Prepare to ship the active feature:
1. Confirm: `scripts/verify.sh` green, `/review` has no Important findings open, specs current, `.env.example` current, migrations ordered.
2. Write PR description: summary, linked intent/spec/plan, AC→test table, risk tier, review findings and how each was addressed, rollout and **rollback steps**.
3. Draft release notes in `spec/features/<id>/release.md`.
4. Stop. A human merges and authorizes production (`RELEASE_APPROVAL`). You may run dev/staging deploys only if `operations.md` allows it. Notes: $ARGUMENTS
