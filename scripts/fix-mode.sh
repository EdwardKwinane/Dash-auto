#!/usr/bin/env bash
# Locks test files during a bug fix so the agent can't weaken the check. Enforced by the guardrails plugin.
set -euo pipefail
cd "$(dirname "$0")/.."
flag=".opencode/state/fix-mode"
case "${1:-}" in
  on)  mkdir -p .opencode/state && date -u +%FT%TZ > "$flag" && echo "fix-mode ON: test files locked" ;;
  off) rm -f "$flag" && echo "fix-mode OFF: test files unlocked" ;;
  status) [ -f "$flag" ] && echo "ON since $(cat "$flag")" || echo "OFF" ;;
  *) echo "usage: scripts/fix-mode.sh on|off|status" >&2; exit 2 ;;
esac
