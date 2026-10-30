---
name: platform-readiness
description: Audit official developer documentation, skills, plugins, MCP servers, CLI versions and safe authentication status before using any external platform.
---
# Platform readiness audit

1. Identify the exact platform and feature being used.
2. Find the official developer portal and relevant docs. Read API/SDK, auth, CLI, MCP, security, quotas/pricing,
   deployment and data-handling terms as applicable. Record URLs and checked date.
3. Discover available installed skills, plugins/connectors, MCP tools and CLI. Read this skill's companion
   instructions before invoking any integration-specific tool.
4. Verify CLI version and help output in the CLI's actual intended execution environment (local workstation,
   cloud CI or cloud provider environment — record which). Do not guess command flags.
5. Verify authentication only through documented non-secret status checks. Never print environment variables,
   tokens, keys, credential files or OAuth secrets. Human completes browser/device login and consent.
6. Validate MCP connectivity using harmless read-only access. Do not create, update or delete remote resources.
7. Record evidence, scopes, limits, costs, licensing, data residency and unresolved risks in
   `spec/platform-readiness.md`. Record whether each platform's tooling runs locally, in cloud CI or in the
   cloud provider environment; distinguish local developer tooling from cloud backend services.
8. Mark Ready only when all required evidence is present. Otherwise Conditional or Blocked and stop before use.

Do not treat installation as proof of authentication, connection as proof of permission, or a free tier as a
production SLA. Prefer official sources. If sources conflict, cite both and escalate.
