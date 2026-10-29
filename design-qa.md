# PayMe landing page — design QA

## Final result

passed

## Comparison setup

- Visual source of truth: `/home/edin/Desktop/Projects/PayMe/PayMe/design-reference-payme-landing.png`
- Source dimensions: 1536 × 1024 pixels
- Implementation target: `http://127.0.0.1:8001/` (Codex in-app browser, tab 1)
- Primary comparison viewport: 1536 × 1024 CSS pixels, unauthenticated, light appearance, page scrolled to the top
- Responsive verification viewports: 768 × 1024 and 375 × 812 CSS pixels
- Implementation evidence: live browser captures taken from the target above after the production build; the browser capture is session evidence and is not persisted as a repository asset

## Iteration history

### Iteration 1

- P1: the hero occupied too much vertical space, pushing the product story lower than the reference.
- P1: the headline was materially larger than the selected concept.
- P2: the product journey was too narrow and did not create the same wide visual anchor.
- Fixes: reduced desktop hero top spacing, reduced the desktop headline scale, tightened CTA spacing, and changed the product journey to a viewport breakout capped at 1440px.

### Iteration 2

- Rebuilt the production bundle and reloaded the page at 1536 × 1024.
- The badge, headline, description, CTA group, support line, and product journey now match the source hierarchy and near-fold composition.
- No remaining P1 or P2 fidelity issues were found.

## Fidelity review

- Typography: Instrument Sans is used consistently; weight, headline hierarchy, and compact product UI labels match the source direction.
- Spacing and layout: the centered hero, generous whitespace, wide product canvas, compact sticky navigation, and section rhythm are consistent with the selected concept.
- Color: warm off-white surfaces, dark ink text, evergreen actions, soft mint panels, and restrained coral overdue states match the chosen direction without gradients or glass effects.
- Images and assets: the product story is rendered as crisp native UI rather than a scaled raster screenshot; no low-resolution assets are present.
- Copy: the selected hero promise is preserved and supporting copy avoids unsupported guarantees or fabricated customer claims.
- Icons: Lucide icons are used with consistent stroke weight and familiar metaphors; decorative icon containers have accessible text context.
- Responsiveness: verified at desktop, tablet, and mobile widths. `scrollWidth` equals `clientWidth` at all three breakpoints, so no horizontal overflow is present.
- Accessibility: semantic headings, a skip link, keyboard-capable native controls, visible focus styles, reduced-motion handling, accessible FAQ disclosure state, labeled calculator inputs, and adequate touch targets are present.

## Interaction and runtime checks

- Reminder tone selector updates the email preview.
- ROI calculator recalculates the recoverable value.
- FAQ disclosures expand and expose their answer text.
- Mobile navigation opens and closes correctly.
- Browser console errors and warnings: none.
- Production title: `PayMe — Stop Chasing Unpaid Invoices`.

## Accepted P3 differences

- The logo glyph is a code-native currency mark rather than the tiny generated reference glyph, improving clarity and consistency with the shipped icon system.
- The product journey contains realistic, legible UI details instead of reproducing the generated mock's incidental text artifacts.
