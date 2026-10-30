#!/usr/bin/env bash
# Runs eval cases non-interactively, each in a disposable git worktree.
set -uo pipefail
root="$(git rev-parse --show-toplevel)"; cd "$root"
filter="${1:-}"
pass=0; fail=0
for f in evals/cases/*${filter}*.json; do
  [ -e "$f" ] || { echo "no cases match"; exit 2; }
  name=$(jq -r .name "$f"); prompt=$(jq -r .prompt "$f"); check=$(jq -r .check "$f"); to=$(jq -r '.timeout_s // 600' "$f")
  wt="$(mktemp -d)/wt"
  git worktree add -q --detach "$wt" HEAD || { echo "worktree failed"; exit 2; }
  echo "▶ $name"
  ( cd "$wt" && timeout "$to" opencode run "$prompt" >"$wt/../agent.log" 2>&1 )
  if ( cd "$wt" && bash -c "$check" ); then echo "  ✔ pass"; pass=$((pass+1)); else echo "  ✘ FAIL (log: $wt/../agent.log)"; fail=$((fail+1)); fi
  git worktree remove --force "$wt" >/dev/null 2>&1
done
echo "evals: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
