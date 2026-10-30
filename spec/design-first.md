# Design-First Delivery Standard

## Source of truth
Figma is the authoritative product UI source unless governance explicitly approves another source. Record the
Figma file URL, file key, page/frame/node IDs, version or last-modified timestamp, and access limitations.
Do not infer designs from screenshots if structured Figma data is accessible.

## Figma extraction and sync
1. Discover the connected Figma MCP/plugin/API tools and read their skill/integration instructions.
2. Confirm access to the correct file and inspect all pages, sections, frames, components, component sets,
   variables, styles, assets, prototype links and annotations relevant to scope.
3. Retrieve design context for each screen and reusable component. Preserve source node IDs and links.
4. Export/retrieve assets from Figma where permitted; preserve original names and intended variants. Do not
   recreate logos, illustrations or product imagery when approved source assets exist.
5. Build a traceable inventory: page → screen/frame → component → application route/feature → acceptance criteria.
6. Report inaccessible frames, unsupported properties, missing assets and ambiguities. Never claim a complete
   pull if any relevant content was not retrieved.
7. Re-sync before implementation and whenever the approved Figma source changes materially.

## Mandatory responsive coverage
For every in-scope screen, provide approved variants/specifications for:
- Desktop: 1440px reference
- Laptop: 1280px reference
- Tablet: 768px reference
- Mobile: 390px reference
- Small mobile: 360px validation

These are reference widths, not the only viewport widths. Define fluid behavior and breakpoints. Redesign
navigation, information hierarchy, grids, filters, tables, galleries, forms, dialogs and interactions per
device; do not simply shrink desktop frames.

## Required design artifacts
- Design system: color, typography, spacing, grid, breakpoints, radius, elevation, iconography and motion.
- Component library: anatomy, variants, states, tokens, responsive rules and accessibility behavior.
- Complete screen inventory for customer, account, seller and admin experiences in scope.
- Interaction/prototype flows for all critical journeys, including error/empty/loading/success states.
- Responsive screen coverage matrix and Figma node links.
- Design-to-requirement traceability and asset inventory.
- Open design questions and explicit deviations from the design system.

## Design QA gate
Check visual consistency, responsive reflow, content priority, overflow/clipping, touch targets, keyboard/focus,
contrast, labels, semantic structure, error states, image behavior and critical journey continuity.
No unresolved blocker or missing required viewport may pass. Record evidence and findings.

## Approval
The human must explicitly approve the complete Figma baseline and design QA report. Record approver/date/source
version in `spec/progress.md` and the active feature. Until then, application implementation is prohibited.
