# Product

> Filled by `/init`. Keep updated when scope changes.
> Status: **DRAFT — awaiting human approval (Discover stage)**

## Vision
Dash-auto is a premium automotive vehicle sales and discovery marketplace designed to connect vehicle buyers with
trusted sellers and dealerships. Customers can explore new and used vehicles, search and filter listings, view
detailed specifications and photo galleries, save vehicles to their accounts, submit enquiries, and request test
drives or reservations. Sellers and dealerships have dedicated portals to onboard, submit and manage vehicle
listings, while administrators oversee vehicle approvals, inventory, sellers, customers and marketplace operations.
The platform aims to deliver a seamless, trustworthy and premium automotive buying experience across desktop and
mobile devices.

## Positioning
Globally oriented **portfolio/demonstration project** showcasing production-grade software engineering, agentic
engineering, scalable architecture and international product thinking — for audiences in South Africa, Europe, the
UK, North America, Australia and other markets. Privacy-by-design with **GDPR principles as baseline**
(consent, data minimisation, user rights, security, retention) adaptable to jurisdiction-specific regimes (e.g.
POPIA); no claim of universal compliance; applicable legal requirements must be assessed per market before real
customer data processing. Synthetic test data, sandbox integrations and simulated flows only until requirements
are assessed and approved.

## Target users
| Persona | Goal | Pain today |
|---|---|---|
| Customer (buyer) | Discover, compare, save, enquire, test-drive/reserve vehicles | fragmentation & no trustworthy single browsing experience |
| Seller / dealership | Onboard, submit and manage listings, track approval status | no structured submission/approval channel |
| Administrator | Manage customers/sellers, approve listings, oversee marketplace with an audit trail | no consolidated oversight dashboard |

## Core value proposition
A trustworthy, premium, responsive marketplace that connects onboarded sellers with vehicle buyers, with structured
listing approval and enquiry/test-drive flows.

## Scope

### In scope (MVP v1)
1. **Customer storefront** — premium homepage & vehicle discovery; browse new/used; search, filter, sort,
   pagination; detailed vehicle pages (image galleries, specifications, pricing, seller info); related/recommended
   vehicles.
2. **Customer accounts** — registration, login, profile management; saved vehicles/favourites; enquiry history &
   status tracking; test-drive and reservation requests.
3. **Seller portal** — seller/dealership registration & onboarding; seller dashboard; vehicle submission & image
   management; listing management & submission status; edit/update/withdraw listings.
4. **Admin dashboard** — administrative overview; customer & seller management; vehicle listing review/approval/
   rejection; inventory & listing management; enquiry & reservation oversight; **audit trail for important
   administrative actions**.
5. **Marketplace foundations** — role-based access control (customer/seller/admin); defined vehicle & listing
   lifecycle; secure image upload architecture; responsive design desktop/laptop/tablet/mobile (+ small-mobile
   validation); accessible interfaces; loading/empty/validation/error states.

### Out of scope (explicitly not now)
- Real payment processing and checkout (mock checkout only — no PSP, no PSP keys, no payment webhooks, no real
  card/banking data; simulated flows clearly labelled; see ADR-004).
- Financing/loan applications; insurance integrations.
- Real-time telematics/vehicle tracking.
- Native mobile applications.
- Complex dealer ERP/DMS integrations; international shipping/logistics.
- Production AI pricing/valuation models.

## AI agentic engineering (demonstration seam — future, not built)
Architecture reserves seams for future AI capabilities — intelligent vehicle search, conversational vehicle
discovery, seller listing assistance, automated enquiry handling, administrative workflow agents. **Documented as
future capabilities only;** each requires its own spec → platform/plan → approval gates before implementation.
Provisional provider strategy (OpenRouter + Vercel AI Gateway) recorded in `stack.md` as unverified; nothing
implemented.

## Success metrics
| Metric | Target | Basis |
|---|---|---|
| Design baseline completeness | 100% of in-scope screens × required viewports | design-first gate |
| AC pass rate | 100% of MVP ACs mapped to passing tests | verify gate |
| Review quality | 0 unresolved Important findings | review gate |
| Zero-cost footprint | free-tier use targeted where technically suitable; unavoidable costs (e.g. image storage, third-party email) & trade-offs documented for human approval | platform audit |
| Accessibility | WCAG 2.2 AA basics pass | UI guideline |

## Milestones
| # | Milestone | Features | Status |
|---|---|---|---|
| M0 | Governance baseline committed to GitHub | governance kit | **pushed** (`01aa084`); branch protection confirmed configured (specific settings not independently verified) |
| M1 | Platform audit approved → provider set selected | register | not started |
| M2 | Figma design creation complete; structured source inspection, responsive coverage verification, gap review & human approval pending | all four areas × viewports | design file received; source inspection pending `/platform-audit` + `/design-sync` |
| M3 | Foundation features (RBAC, listing lifecycle) shipped | per feature specs | not started |
| M4 | Storefront/customer flows shipped | per feature specs | not started |
| M5 | Seller portal + admin dashboard shipped | per feature specs | not started |

## Assumptions & risks
- Portfolio phase uses sandbox/free tiers; production exposure requires separate compliance + cost approval.
- Cloud provider undecided by design (evidence-based comparison at `/platform-audit`, ADR-003).
- Figma source exists but completeness (responsive variants, all four areas) is unverified until
  `/platform-audit` + `/design-sync` run.

## Global non-functional requirements
- Performance: provisional API p95 list/detail < 300 ms under a defined workload; image delivery via CDN-backed object storage (targets revisited at architecture approval); page-load performance separate from API latency measurement. 
- Availability: portfolio/demo target; production SLA deferred to real-launch decision.
- Privacy / compliance: GDPR-principles baseline; POPIA-adaptable; documented data flows & retention; data
  residency configurable by region; synthetic data only.
- Accessibility: WCAG 2.2 AA basics.
- Devices/browsers: desktop 1440 / laptop 1280 / tablet 768 / mobile 390 / small mobile 360; modern evergreen
  browsers (exact support matrix set at design stage).
