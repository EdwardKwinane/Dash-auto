---
description: BUILD. Fix a bug using the failing-test-first loop with test files locked
agent: builder
---
Bug: $ARGUMENTS
Follow the `tdd-fix-loop` skill: reproduce as a test, run it, show it fails for the right reason, commit it, run `scripts/fix-mode.sh on`, then fix the code without editing tests until verify is green. Update `lessons.md` if the cause is a recurring pattern. Do not run `fix-mode.sh off`; tell me when done.
