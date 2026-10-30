---
name: tdd-fix-loop
description: Fix a bug with a failing-test-first loop that the agent cannot cheat. Use for any bug report, regression, failing test, or "fix this" request that changes existing behavior.
---
# Failing-test-first bug fix

1. **Reproduce as a test.** Add the smallest test that captures the bug, named after the bug and any AC ID.
2. **Prove it fails for the right reason.** Run it; show the failure output and explain why it matches the reported bug.
3. **Commit the test alone** (`test: reproduce <bug>`).
4. **Lock tests:** `scripts/fix-mode.sh on`. From now on test files cannot be edited (enforced by the guardrails plugin).
5. **Fix the code**, minimal change, until the new test and `scripts/verify.sh` pass. If you believe the test itself is wrong, stop and ask the human.
6. **Report**: root cause, fix, evidence (literal output). Don't run `fix-mode.sh off`; the human does.
7. If the cause is a recurring class (not a one-off), add it to `spec/lessons.md` and suggest an eval in `evals/cases/`.
