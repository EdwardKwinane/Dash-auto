---
description: ARCHITECTURE. Plan an approved design against the verified platform stack
agent: architect
---
Preconditions: approved intent/spec, completed and human-approved platform-readiness register, complete Figma
design baseline, responsive design QA approval. If any is missing, STOP and route to the missing gate.
Confirm the execution model: local frontend development + cloud-hosted backend infrastructure. Interrogate the
codebase and official platform docs; write the plan with risk tier,
approach, exact files, data/API contracts, UI states, responsive Figma node references, security, test mapping for
every AC, rollout/rollback, and risks/alternatives. Record ADRs. No code. Ask for human approval.
