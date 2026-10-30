# Operations (Maintain stage)

> Read by the `ops` agent and `/incident`. Fill in during `/init`; refine after each incident.

## Environments & autonomy
| Env | Agent may | Human required |
|---|---|---|
| dev | deploy freely | — |
| staging | prepare + deploy if listed here | review of changes |
| production | prepare release only | **release authorization** (`RELEASE_APPROVAL`) |

## Metrics & control bands
Detection is deterministic: `node ops/detect.mjs <metric.json>`; bands in `ops/bands.yaml`.
| Metric | Source | Baseline | Owner |
|---|---|---|---|
| ci_test_failure_rate | CI API | rolling 30d | |
| post_deploy_5xx_rate | monitoring | rolling 30d | |

Response tiers: **1σ** log · **2σ** invoke `ops` read-only to diagnose · **3σ** propose a PR (as an `intent.md`) or trigger a pre-approved runbook. The agent never changes production directly.

Invoke the agent after a breach from CI/cron, e.g. `opencode run --command incident "<alert + evidence>"` (check `opencode run --help` for your version).

## Runbooks (pre-approved actions)
| Name | When | Steps | Rehearsed |
|---|---|---|---|
| rollback-deploy | 5xx breach after deploy | 1 … 2 … | date |
| quarantine-flaky-test | CI failure-rate breach | | |

**Rollback is the most rehearsed path.** Test it in staging regularly and record the date above.

## Incident process
1. Alert/ticket → `/incident <evidence>` (read-only diagnosis).
2. Agent writes `features/NNN/intent.md` (anomaly + evidence, proposed outcome) and a draft `lessons.md` entry.
3. Human triages (`/triage`): fix now / schedule / dismiss (dismissals tune the bands).
4. Fix flows through the normal loop (spec → plan → build → review). Hotfix still needs a failing test.
5. After release: finalize `lessons.md`, add an eval in `evals/cases/`.

## Recurring scans
Schedule a dependency/security scan (weekly). Findings that fit one PR go through `/review`; larger ones become an `intent.md`. Record dismissals with a reason.
