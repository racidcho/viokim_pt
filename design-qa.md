# Design QA — FRAME SCRUB HERO

**Source visual truth**

- `/Users/racidcho/.codex/generated_images/019f88ac-b441-7e81-9f4d-d180b99399e5/exec-1314b2ae-8119-4fce-89fa-2fb46eef4fd9.png`
- Source pixels: `1487 × 1058`.
- Selected state: option 1, desktop first screen with the matte identity panel, exposed film still, six-cut scrub rail, and teal active frame.

**Rendered implementation evidence**

- `qa-evidence/hero-frame-scrub/13-desktop-match-final.png` — final desktop state, `CUT 03`, scroll position `0`.
- `qa-evidence/hero-frame-scrub/14-reference-comparison-final.png` — source and final implementation in one normalized side-by-side comparison input.
- `qa-evidence/hero-frame-scrub/08-scroll-manifesto-final.png` — expanded-panel manifesto state.
- `qa-evidence/hero-frame-scrub/09-mobile.png` — responsive touch/thumbnail state.
- Desktop CSS viewport: `1440 × 1024`; implementation capture pixels: `1425 × 1013`; `devicePixelRatio: 1`. The in-app browser capture excludes its scrollbar edge from the saved bitmap.
- Mobile CSS viewport: `390 × 844`; `devicePixelRatio: 1`.
- Comparison normalization: source and implementation were proportionally scaled to `720px` high, kept uncropped, and stacked horizontally. Combined evidence pixels: `2024 × 720`.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: the VIO KIM wordmark has the source's dominant scale and compact tracking. The small mono labels, navigation, Korean line, and cut names preserve the intended editorial hierarchy without clipping or overlap.
- Spacing and layout rhythm: the off-white panel occupies the selected option's left-weighted proportion, keeps the still exposed on the right, and separates identity from the scrub rail with a single fine rule. The scroll state expands the same panel instead of introducing an unrelated transition.
- Colors and visual tokens: off-white, black, photographic blacks, and the existing VIO KIM teal `#35c9b8` reproduce the selected direction's restrained palette and active-state contrast.
- Image quality and asset fidelity: all six frames and the full-bleed background use real stills already present in the project. No placeholder, fabricated film frame, inline SVG, or CSS-drawn image asset is used.
- Copy and content: the portfolio identity, Korean statement, work title, frame index, scrub instruction, and selected-work action are concise and tied to the real project data.
- Accessibility and interaction: the six cut controls are native buttons with `aria-pressed`, focus changes the selected frame, touch uses the thumbnail rail, and the selected-work CTA routes to the matching work detail.

## Focused comparison evidence

- A separate crop was not needed. At the normalized `720px` height in `14-reference-comparison-final.png`, the full wordmark, navigation, panel bounds, teal block, scrub rail, film crop, and lower-corner metadata remain readable enough to judge their alignment and hierarchy.
- The manifesto and mobile states were reviewed at their native captures because those interaction states are not represented in the static source option.

## Comparison history

1. Earlier implementation exposed a P1 black blank area during the sticky scroll transition.
   - Cause: `overflow-hidden` on the hero and `overflow-x-hidden` on the home root created the wrong sticky containing block.
   - Fix: removed hero overflow clipping and changed the home root to `overflow-x-clip`.
   - Post-fix evidence: `qa-evidence/hero-frame-scrub/06-scroll-sticky-fixed.png`.
2. The first manifesto capture had a P2 Korean text overlap.
   - Fix: reduced the responsive display scale, increased line height, and made the highlighted phrase an inline block.
   - Post-fix evidence: `qa-evidence/hero-frame-scrub/08-scroll-manifesto-final.png`.
3. The custom SCRUB cursor produced a P2 obstruction over the logo and navigation.
   - Fix: scoped the cursor target to the exposed image layer while keeping frame selection active across the hero.
   - Post-fix evidence: `qa-evidence/hero-frame-scrub/12-desktop-match-cut-03.png`.
4. The wordmark remained a P2 scale mismatch against the selected option.
   - Fix: increased the large-screen wordmark to `clamp(8rem, 12vw, 11.5rem)`.
   - Post-fix evidence: `qa-evidence/hero-frame-scrub/13-desktop-match-final.png` and the combined `14-reference-comparison-final.png`.

## Primary interactions tested

- Horizontal pointer movement switches across all six hard-cut frames.
- Thumbnail click and keyboard focus update the active frame and `aria-pressed` state.
- Scroll expands the matte panel and crossfades identity into the manifesto without a blank interval.
- `VIEW SELECTED WORK` routes to `/work/be-my-baby` through the existing slate transition.
- Mobile keeps the identity and horizontally scrollable cut rail usable without relying on hover.
- Browser console checked: no error-level messages.

## Open questions

- None blocking. Motion uses still-frame scrubbing because project video assets are intentionally unavailable.

## Follow-up polish

- P3: when real reels arrive, the same frame rail can become a chapter selector without changing the first-screen composition.

## Implementation checklist

- [x] Match selected option 1 with real portfolio imagery.
- [x] Make the first screen interactive without requiring video.
- [x] Preserve keyboard, pointer, and touch paths.
- [x] Verify desktop, scroll, mobile, routing, and console state.
- [x] Compare source and implementation in one normalized input.
- [x] Resolve all P0/P1/P2 findings.

final result: passed
