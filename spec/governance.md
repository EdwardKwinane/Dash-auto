# Governance

Controls match risk. Low-risk work moves fast; critical code gets human eyes. Enforced where possible by **config and plugins**, not habit.

## Risk tiers
| Tier | Examples | Plan approval | Diff review | Autonomy |
|---|---|---|---|---|
| 0 | Docs, typos, copy, comments, formatting | none | skim | Agent proceeds |
| 1 | Routine feature/bug in existing patterns, UI, tests | human approves plan | `/review` + human skim | Agent implements all tasks |
| 2 | Auth, payments, PII/data model, migrations, infra/CI, new dependency, public API change | human approves plan | **human reads the diff** + `/review` | Agent implements task by task, pauses per task |
| 3 | Regulated/critical logic (money movement, health/legal data, security controls) | human + second approver | human line-level review + `/review` | Agent drafts only; human drives merge |

When unsure, pick the higher tier. Record the tier at the top of `plan.md`.

## Source of truth
| Artifact | Authoritative system | Link rule |
|---|---|---|
| intent / spec / plan / tasks | Repo (`spec/features/`) | Ticket ID in header |
| Work items | Repo / (Jira / Linear / GitHub Issues) | Commit SHA in ticket |
| Designs | Figma (unless explicitly superseded) | File URL + page/frame/node IDs + source version in feature design baseline |
| Release approvals | (PR approval / change ticket) | Link in release notes |

## Enforced controls
| Control | Mechanism |
|---|---|
| No secret reads, protected-path edits | `.opencode/plugins/guardrails.ts` + `spec/protected-paths.txt` |
| Tests can't be edited during a bug fix | `scripts/fix-mode.sh` + plugin |
| No prod deploy without human release approval | plugin checks `RELEASE_APPROVAL` env |
| Destructive commands | `opencode.json` permissions + plugin |
| Author ≠ approver | Agent never merges; human approves PR (set branch protection) |
| Agent config regression-tested | `evals/` in CI |

Skills and `AGENTS.md` are **advisory**; anything that must always hold needs a plugin/permission/CI check behind it. The plugin is a speed bump against mistakes, not a sandbox: for stronger isolation run OpenCode in a container/devcontainer with no production credentials.

## Audit trail
`intent.md` → `spec.md` → `plan.md` → diff + tests → PR + review findings → release notes → incident record. All in git. Conventional Commits cite IDs.

## Change control for this kit
Changes to `AGENTS.md`, skills, agents, plugins, `protected-paths.txt` are reviewed like code and trigger evals.


## Mandatory project gates
- Platform-readiness audit: official docs, skills/plugins, MCP, CLI and safe auth status for every selected platform.
- Design-first gate: complete Figma extraction, responsive variants, design QA and explicit human approval before app implementation.
- Local frontend / cloud backend execution: local frontend development and approved frontend checks run on the
  local workstation; cloud CI may repeat them; all backend infrastructure and backend services run in approved
  cloud environments — never locally.
- Component planning: each component/feature has an approved plan, contracts, states, responsive behavior, accessibility and test mapping.
