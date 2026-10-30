# Tasks: Feature NNN — <Name>

Legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked · `[P]` can run in parallel
Rules: one task at a time, in order. Each task ≤ ~30 min, names exact files, and has a verifiable "Done when".
Order: Contracts → Tests → Implementation → Integration → Polish.

## Phase 1 — Foundations
- [ ] **T001** Add migration for `<table>` — `db/migrations/...`
  - Refs: FR-001 · Done when: migration applies and rolls forward cleanly; `data-model.md` updated

## Phase 2 — Tests first
- [ ] **T002** Write failing integration tests for AC-001 — `tests/integration/...`
  - Refs: AC-001 · Done when: tests exist and fail for the right reason

## Phase 3 — Backend
- [ ] **T003** Implement service `<name>` — `apps/api/src/...`
  - Refs: FR-001 · Done when: T002 tests pass

## Phase 4 — Frontend
- [ ] **T004** Build `<Component>` with loading/empty/error states — `apps/web/src/...`
  - Refs: US-001 · Done when: component renders all states; a11y checks pass

## Phase 5 — Verify & Docs
- [ ] **T005** E2E happy path — `tests/e2e/...`
  - Done when: passes locally and in CI
- [ ] **T006** Run `/verify`, then `/review`; address Important findings
  - Done when: all AC mapped to passing tests; no open Important findings
- [ ] **T007** Run `/ship` (PR text, release notes, rollback) then `/sync`
  - Done when: specs and `progress.md` current; human merges

## Notes
- Backend-phase tasks: run only against approved cloud dev/staging environments; never start local backend
  servers, databases, Redis, queues or Docker-based backend infrastructure.
- E2E tasks with a cloud backend dependency: "passes locally" always means locally against the approved cloud
  dev/staging backend or clearly labelled mocks — never production, never local backend infrastructure.

## Discoveries
- 
