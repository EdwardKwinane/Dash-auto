#!/usr/bin/env bash
# The agent's feedback loop. One command, exits non-zero on ANY failure.
# Execution environment: local frontend checks by default (lint/typecheck/unit tests/build).
# CLOUD_CHECK_CMD is for backend-dependent checks; it must target approved cloud dev/staging endpoints
# and is skipped (loudly) by default. Never make this script start local backend servers, databases,
# Redis, queues or Docker-based backend infrastructure. Override per project via env or edit the defaults.
# Set a var to "skip" to skip (loudly).
set -uo pipefail
cd "$(dirname "$0")/.."

LINT_CMD="${LINT_CMD:-pnpm lint}"
TYPECHECK_CMD="${TYPECHECK_CMD:-pnpm typecheck}"
TEST_CMD="${TEST_CMD:-pnpm test}"
BUILD_CMD="${BUILD_CMD:-pnpm build}"
# Backend-dependent verification. "skip" = no cloud backend configured for this run.
CLOUD_CHECK_CMD="${CLOUD_CHECK_CMD:-skip}"

fail=0
run() {
  local name="$1" cmd="$2"
  if [ "$cmd" = "skip" ]; then echo "=== $name: SKIPPED (configure me in scripts/verify.sh) ==="; return; fi
  echo "=== $name: $cmd ==="
  if bash -c "$cmd"; then echo "--- $name: OK"; else echo "--- $name: FAILED"; fail=1; fi
}

echo "=== environment: local frontend checks (pinned by this repo's execution policy) ==="
run LINT "$LINT_CMD"
run TYPECHECK "$TYPECHECK_CMD"
run TEST "$TEST_CMD"
run BUILD "$BUILD_CMD"

echo "=== environment: cloud-dependent backend checks (approved cloud dev/staging only) ==="
if [ "$CLOUD_CHECK_CMD" = "skip" ]; then
  echo "=== CLOUD CHECK: SKIPPED — no approved cloud dev/staging backend configured for this run."
  echo "    Backend-dependent tests are NOT verified by this run; do not report them as passing."
else
  run CLOUD-CHECK "$CLOUD_CHECK_CMD"
fi

if [ "$fail" -eq 0 ]; then echo "VERIFY PASSED"; else echo "VERIFY FAILED"; fi
exit "$fail"
