---
description: AUDIT. Verify official developer platforms, skills, plugins, MCP, CLI and authentication readiness
agent: architect
---
Audit every platform selected or proposed for this project before implementation. Read official developer docs
for APIs/SDKs, auth, CLI, MCP, security, quotas/pricing, terms and deployment. Discover installed skills/plugins/
MCP/CLI integrations and read relevant skill instructions. Verify CLI version/help and safe auth status in each
tool's actual intended execution environment (local workstation, cloud CI or cloud provider environment), and
record which is intended. Distinguish local developer tooling from cloud backend services; do not require a
remote cloud development workspace unless one is explicitly selected. Use harmless read-only MCP checks. Never
expose credentials or perform interactive login for the human. Never claim a platform is connected or
authenticated without verification evidence. Update `spec/platform-readiness.md` with URLs, dates, evidence,
status and blockers. Do not install, create resources, mutate data or start implementation. Stop for human
approval.
