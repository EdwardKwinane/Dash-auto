# Metrics

Run `scripts/metrics.sh` (git history only). Review monthly; tune the process, not people.

| Stage | Leading indicator | Lagging indicator | Where it comes from |
|---|---|---|---|
| Plan | Time from first idea to committed `intent.md` | % of intents accepted into Design | git log of `intent.md` |
| Design | Hours intent → spec | Spec rework: `spec.md` commits after first `plan.md` | `scripts/metrics.sh` |
| Build | % tasks merged on first pass; plan→PR time | Rework cycles; diff matches `plan.md` | PR history |
| Test | First-pass CI success of agent changes | Change failure rate; review time per PR | CI, incidents |
| Deploy | Time to first review | Defects caught pre-merge vs escaped | PR history, incidents |
| Maintain | Time breach → `intent.md` | Repeat incidents of same class; findings→merged fixes | `ops/`, `lessons.md` |

Also track: eval pass rate over time; mistakes added to AGENTS.md per month (should fall).
