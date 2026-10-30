#!/usr/bin/env bash
# One git worktree per parallel task: scripts/worktree.sh <name> [base-branch]
# Then: cd ../<repo>-<name> && opencode
set -euo pipefail
name="${1:?usage: scripts/worktree.sh <name> [base-branch]}"
base="${2:-HEAD}"
root="$(git rev-parse --show-toplevel)"
dir="$(dirname "$root")/$(basename "$root")-$name"
git worktree add -b "feat/$name" "$dir" "$base"
echo "Created $dir on branch feat/$name. Start OpenCode there. Remove later: git worktree remove \"$dir\""
