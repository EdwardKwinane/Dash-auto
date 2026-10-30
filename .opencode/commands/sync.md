---
description: Close the session. Reconcile specs with reality and write the handoff
agent: builder
---
1. Compare this session's changes with `spec.md`, `plan.md`, `tasks.md`, `data-model.md`, `api-contracts.md`, `stack.md`, `decisions.md`, `operations.md`; update anything stale (code is truth unless it violates the spec: then flag it).
2. If you made the same mistake twice or I corrected you, add a one-line rule to "Things agents get wrong here" in `AGENTS.md` (keep the file under one page).
3. Rewrite `progress.md`: Current State, specific Next Step, blockers, tech debt, Feature Index, Session Log line.
4. Check `.env.example` matches required vars. Summarize in under 10 lines. Note: $ARGUMENTS
