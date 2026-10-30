# Testing Strategy

## Principles
- Every acceptance criterion (AC-xxx) has at least one automated test referencing its ID in the test name or comment.
- Test behavior, not implementation. Prefer real code over mocks; mock only true external boundaries.
- Tests must be deterministic: no sleeps, no shared mutable state, no reliance on real time/network.
- A bug fix starts with a failing regression test.

## Pyramid
| Level | Tool | What | Where it runs | What it exercises |
|---|---|---|---|---|
| Unit | Vitest/Jest/Pytest | Pure logic, validators, utils | local, next to source | code, no backend |
| Component | Vitest + Testing Library, browser tests | UI components/states | local, next to source | approved Figma rendering; mocked fixtures only |
| Integration | same + cloud test DB | Services + DB, API routes | approved cloud dev/staging; files under `tests/integration` | real backend behavior |
| E2E | Playwright | Critical user journeys only | local browser against approved cloud dev/staging backend (or labelled mocks if backend unavailable); files under `tests/e2e` | frontend flow + backend endpoints |

## Rules
- Backend integration tests must target approved cloud development/staging services or a controlled cloud test
  environment — never a locally installed database/server/Redis.
- Never start local backend infrastructure to make tests run. If no cloud backend is available, backend-dependent
  tests are blocked and reported as such with an explicit reason; local mocks/fixtures may only be used for
  frontend work and must be clearly labelled as mocks, never presented as verified live backend behavior.
- Use a dedicated test database (approved cloud dev/staging); reset per test file via transactions or truncation.
- Factories/fixtures live in `tests/factories`; no real PII.
- Coverage guideline: ≥ 80% lines on services/domain logic; don't chase coverage on glue code.
- E2E: cover the happy path of every shipped feature + the top failure path.

## Commands
See `stack.md`. Run lint + typecheck + tests before ticking any task.

## Known gaps
- 
