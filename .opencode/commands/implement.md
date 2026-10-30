---
description: BUILD. Implement the next task(s), test-first, with verification
agent: builder
---
Scope: $ARGUMENTS (default: next unchecked task only, then stop).
Confirm spec/plan/tasks are approved, state the risk tier and the task you'll do, then follow the Builder loop: failing test → minimal change → `scripts/verify.sh` (paste output) → update specs → tick task → log → commit. Tier 2+: stop after each task.
