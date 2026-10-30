# UI / UX Guidelines

## Source of truth
Use the approved Figma design baseline and its linked nodes. Do not invent or redesign UI during implementation.
Every UI task references the exact Figma screen/component node IDs and approved responsive variants.

## Design principles
- Clarity over decoration. One primary action per screen.
- Every async view has loading, empty, error and success states.
- Forms preserve input on error, show inline validation and disable duplicate submission.
- Component behavior and visual variants are planned before implementation.

## Responsive requirements
- Design and verify desktop 1440, laptop 1280, tablet 768, mobile 390 and small mobile 360.
- Define fluid behavior between reference widths; no horizontal overflow, clipping or accidental overlap.
- Adapt navigation, information hierarchy, grids, tables, filters, galleries, forms and dialogs per device.
- Touch targets, sticky elements, keyboard behavior and mobile input modes must be specified.
- Do not treat responsive design as simple proportional scaling.

## Accessibility (WCAG 2.2 AA minimum)
- Keyboard operation, visible focus, logical tab order and semantic HTML.
- Labels for inputs; meaningful alt text; ARIA only when native semantics are insufficient.
- Contrast ≥ 4.5:1 for normal text; respect reduced-motion preferences.
- Include focus, disabled, validation, loading and error states in design and tests.

## Patterns
- Tokens, typography, components, icons and breakpoints come from approved Figma design system.
- Define routing, data fetching, state ownership, toast/modal behavior in feature plans.
- Use consistent locale-aware date, number and currency formatting.
