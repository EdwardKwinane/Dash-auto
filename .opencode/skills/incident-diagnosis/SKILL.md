---
name: incident-diagnosis
description: Diagnose a production incident, alert, or control-band breach read-only and write the result as an intent.md. Use for incidents, outages, error-rate spikes, failing CI trends, or post-mortems.
---
# Incident diagnosis

Read-only. Never change production or deploy.

1. **Scope**: what metric/alert, when it started, what changed nearby (`git log`, recent deploys, config). Use `ops/bands.yaml` tier to decide depth.
2. **Evidence**: gather observations (logs, metrics output, failing tests). Record each as fact with its source.
3. **Hypotheses**: rank causes; for each, what would confirm or refute it. Say which you checked.
4. **Most likely cause + confidence** (low/med/high) and what you could not verify.
5. **Mitigation options**: roll back (see `operations.md` rollback), flag off, or forward fix. Recommend one; never execute it.
6. **Write back**: new `intent.md` (Problem = anomaly + evidence; Proposed outcome = restored baseline + prevention; Affected systems; Constraints; Open questions). Draft a `lessons.md` entry. Suggest an eval so the class of incident stays covered.
