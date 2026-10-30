---
name: figma-design-extraction
description: Retrieve and map complete Figma design sources for implementation; mandatory before app coding.
---
# Figma design extraction

1. Read the Figma integration skill and discover available MCP/API tools before calling them.
2. Confirm the intended file and human-granted access. Use read-only retrieval first.
3. Enumerate relevant pages and sections. Retrieve frames, nested layers, component sets, variants, variables,
   styles, assets, prototype connections and annotations available through the integration.
4. For every screen/component, preserve its Figma URL and page/frame/node ID. Capture source version/modified time.
5. Create a screen, component and asset inventory. Map screens/components to product requirements and routes.
6. Identify absent mobile/tablet designs, missing states, unsupported Figma properties and retrieval failures.
   Never fill gaps with invented UI; create explicit design tasks/questions.
7. Ensure responsive coverage at 1440, 1280, 768, 390 and 360 reference widths, with fluid behavior between.
8. Produce `design-baseline.md`, then design QA findings. Stop for explicit human approval.
9. Re-sync approved designs immediately before UI implementation and whenever source changes.
10. Do not write application code, convert the design into components, or claim completeness until all relevant
    source content and gaps are accounted for.
