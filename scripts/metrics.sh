#!/usr/bin/env bash
# SDLC metrics from git history only. Run from repo root: scripts/metrics.sh
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
first() { git log --diff-filter=A --follow --format=%ct -- "$1" 2>/dev/null | tail -1; }
printf "%-28s %-18s %-18s %-14s\n" FEATURE "intent→spec (h)" "spec→plan (h)" "spec rework"
for d in spec/features/[0-9]*/; do
  id=$(basename "$d")
  i=$(first "$d/intent.md"); s=$(first "$d/spec.md"); p=$(first "$d/plan.md")
  h() { [ -n "$1" ] && [ -n "$2" ] && echo $(( ($2 - $1) / 3600 )) || echo "-"; }
  rework="-"
  if [ -n "$p" ]; then rework=$(git log --format=%ct -- "$d/spec.md" | awk -v p="$p" '$1>p' | wc -l | tr -d ' '); fi
  printf "%-28s %-18s %-18s %-14s\n" "$id" "$(h "$i" "$s")" "$(h "$s" "$p")" "$rework"
done
echo
echo "Merged commits last 30d: $(git log --since='30 days ago' --oneline | wc -l | tr -d ' ')"
echo "Reverts last 30d:        $(git log --since='30 days ago' --oneline -i --grep='^revert' | wc -l | tr -d ' ')"
