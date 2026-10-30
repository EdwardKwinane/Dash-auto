---
description: MAINTAIN. Diagnose an incident or control-band breach and write it back as intent.md
agent: ops
---
Input (alert, log excerpt, ticket, or description): $ARGUMENTS

Use the `incident-diagnosis` skill. Read-only investigation. Then (1) create a new feature folder with `intent.md` in the Plan format containing the anomaly + evidence, proposed outcome, affected systems, constraints, open questions; (2) add a draft entry to `spec/lessons.md`; (3) update `progress.md`. State your confidence and what you could not verify. Stop for my triage: fix now, schedule, or dismiss.
