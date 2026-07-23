# Mobile Opening Handoff Design QA

## Comparison Target

- Source visual truth, current production:
  - `audit-evidence/mobile-black-runway-current/mobile-560.png`
  - `audit-evidence/mobile-black-runway-current/mobile-760.png`
  - `audit-evidence/mobile-black-runway-current/mobile-1000.png`
- Revised local implementation:
  - `audit-evidence/mobile-black-runway-fixed/mobile-560.png`
  - `audit-evidence/mobile-black-runway-fixed/mobile-760.png`
  - `audit-evidence/mobile-black-runway-fixed/mobile-1000.png`
- Combined same-scroll comparison:
  - `audit-evidence/mobile-black-runway-fixed/11-mobile-before-after.png`
- Desktop regression evidence:
  - `audit-evidence/mobile-black-runway-fixed/12-desktop-regression.png`
- Mobile CSS viewport: 390 x 844 at device scale factor 1.
- Browser captures: 375 x 812 pixels on both sides; no density normalization was required before the 750 x 812 side-by-side comparison.
- State: mobile scroll handoff after the 2.39:1 frame has opened and before the selected-work hero becomes active.

## Findings

### Source Pass

- P1, mobile handoff: the aperture frame and title reached zero opacity before the sticky stage released.
- Evidence: at scroll Y 760, the opening still occupied 717 px of the viewport, but both frame and title opacity were `0`.
- Impact: roughly 0.8 screen of featureless black remained, which visually resembled a loading error or missing section.

### Fixes Applied

- Moved frame, title, and skip-control exit timing from the opening-progress phase to a dedicated post-sticky handoff progress.
- Kept the opened frame fully visible through the end of the sticky sequence, then faded it while the next hero entered.
- Reduced the mobile aperture section from `175svh` to `150svh`.
- Preserved the exact sequential boundary: every sampled state reports `openingBottom === heroTop`.

### Final Pass

- No actionable P0, P1, or P2 issue remains.
- At scroll Y 560, the frame/title remain at `0.9749` opacity while 138 px of the hero has entered.
- At scroll Y 760, the outgoing frame/title remain partially visible while 338 px of the hero is present.
- At scroll Y 1000, the hero occupies 578 px of the viewport and the outgoing content has completed its fade.
- The transition reads as an editorial dissolve and push rather than an empty black page.

## Required Fidelity Surfaces

- Fonts and typography: the existing mono and serif-italic hierarchy remains unchanged and readable throughout the transition.
- Spacing and layout rhythm: the mobile runway is 25svh shorter, and the outgoing/incoming sections meet on one exact teal boundary without overlap or gap.
- Colors and visual tokens: the black cinema canvas and `#35c9b8` rule are preserved; the black area is now supported by visible image and title content.
- Image quality and asset fidelity: the same 1280 x 536 motion reel remains in the 2.39:1 frame with no new crop, stretch, or generated asset.
- Copy and content: `FRAME OPEN · 2.39:1`, `BE MY BABY`, the year/role line, and incoming project metadata remain staged in sequence.

## Interaction and Browser Verification

- Native vertical scrolling advances and reverses the transition.
- Mobile opening and hero remain geometrically adjacent at all sampled positions.
- Desktop retains the black full-frame selected-cut state; the white panel remains hidden.
- Browser console warning/error scan: clean.
- `npm run build`: passed.
- Targeted ESLint for `CinematicAperture.tsx`: passed.
- `git diff --check`: passed.

## Comparison History

### Pass 1

- Evidence: `mobile-black-runway-current/mobile-760.png`.
- Result: blocked by the P1 empty black runway.

### Pass 2

- Evidence: `mobile-black-runway-fixed/11-mobile-before-after.png`.
- The earlier P1 is resolved by delaying the frame exit and shortening the mobile section.
- No additional P0, P1, or P2 issue was found.

final result: passed
