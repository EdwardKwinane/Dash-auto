# SDLC Kit Update

## Added
- Mandatory platform-readiness stage and register for official docs, installed skills, plugins, MCP, CLI and
  safe authentication verification.
- Mandatory Figma-first design stage, full source inventory, node-level traceability, asset capture and explicit
  handling of inaccessible content.
- Responsive design gate covering desktop, laptop, tablet, mobile and small mobile.
- Design QA and explicit human approval before application implementation.
- Local frontend / cloud backend execution policy: OpenCode and the repository run on the approved local
  workstation; all frontend development and approved frontend checks run locally; all backend infrastructure and
  backend services run in approved cloud environments (never locally); cloud CI repeats frontend checks.
- Component-level planning requirements before implementation.
- New `/platform-audit`, `/design-sync`, `/design-review` commands and reusable skills.
- Updated Architect/Builder instructions, workflow, governance, UI guidelines, progress handoff and quickstart.

## Changed
- 2026-10-30: Replaced the incorrect "cloud-only execution" policy with the approved **local frontend /
  cloud backend** execution model throughout the kit (AGENTS.md, quickstart, workflow, governance, platform
  readiness, testing, stack, architecture, scripts, OpenCode agents/commands/skills). Local frontend
  development is now explicitly permitted; local backend infrastructure stays prohibited.
- 2026-10-30: Added stage entry/exit/stop-condition gates and an explicit operation→environment table to
  `spec/workflow.md`; recorded the official GitHub identity (`origin` → EdwardKwinane/Dash-auto, default branch
  `main`, SDLC-baseline-as-first-commit plan) in `spec/stack.md` and `spec/progress.md`; tightened `.gitignore`
  (build/test artifacts, logs, OS files, kit zip excluded from Git — files untouched on disk); added execution-
  model compliance checks to `REVIEW.md`; recorded ADR-002 and the kernel of the baseline-commit plan.

## Preserved
- Existing risk tiers, human approval model, test-first workflow, independent review, production release gate,
  incident process, eval framework and original helper scripts.

## Important
This kit defines controls and required evidence; it does not provision cloud infrastructure, authenticate
accounts, connect Figma, configure MCP servers, or guarantee a provider's free tier/SLA. Those must be verified
in the target project using the official developer platforms before implementation.
