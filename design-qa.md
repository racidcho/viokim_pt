# Opening-to-Hero Transition Design QA

## Comparison Target

- Source visual truth, current production:
  - `audit-evidence/transition-overlap-current/desktop-1420.png`
  - `audit-evidence/transition-overlap-current/mobile-560.png`
- Revised local implementation:
  - `audit-evidence/transition-overlap-fixed/desktop-1600.png`
  - `audit-evidence/transition-overlap-fixed/mobile-560.png`
  - `audit-evidence/transition-overlap-fixed/mobile-1000.png`
- Combined comparison evidence:
  - `audit-evidence/transition-overlap-fixed/11-desktop-before-after.png`
  - `audit-evidence/transition-overlap-fixed/12-mobile-before-after.png`
- Desktop CSS viewport: 1440 x 1024 at device scale factor 1.
- Mobile CSS viewport: 390 x 844 at device scale factor 1.
- Desktop source screenshot: 1425 x 1013 pixels; implementation: 1440 x 1024 pixels. Both were normalized to 720 x 512 per side.
- Mobile source screenshot: 375 x 812 pixels; implementation: 390 x 844 pixels. Both were normalized to 390 x 844 per side.
- State: the scroll handoff between the cinematic aperture and the selected-work hero.

## Findings

### Source Pass

- P1, desktop transition: the aperture stage became translucent while the following hero was already inside the viewport. The white VIO KIM panel, its duplicate navigation, and the selected-cut thumbnails visibly mixed with the cinematic frame.
- P1, mobile transition: the opening frame remained fixed while the mobile hero entered underneath it. The hero's `VIO KIM`, project title, cut counter, and still image appeared inside the same viewport as the opening title and frame.
- P2, navigation timing: the global white navigation appeared before the hero had become the active section, adding a third layer during the handoff.

### Fixes Applied

- Removed the `-90svh` section overlap so the opening bottom and hero top share the same boundary at every handoff sample.
- Replaced the crossfade with a black editorial push: the aperture frame and metadata fade to black, then the black selected-work hero enters from below.
- Reduced the aperture runway to 200svh on desktop and 175svh on mobile to keep the non-overlapping transition concise.
- Made the desktop hero open directly in the black full-frame selector; the former white identity panel is hidden from the initial experience.
- Changed global navigation reveal timing so it appears only when the hero reaches the top portion of the viewport.
- Fully removed the opening title and skip control during the exit stage.

### Final Pass

- No actionable P0, P1, or P2 visual issue remains.
- Geometry checks at every sampled transition point report `openingBottom === heroTop`; there is no overlap and no gap.
- Desktop white panel visibility remains `hidden`; the black full-frame selector remains `visible`.
- Mobile opening and hero copy never occupy the same region. At the midpoint, a single teal rule separates the outgoing black matte from the incoming hero.

## Required Fidelity Surfaces

- Fonts and typography: existing sans, mono, and serif-italic roles are preserved. The handoff contains only one readable text hierarchy at a time.
- Spacing and layout rhythm: the outgoing and incoming sections meet on one exact horizontal boundary. Desktop full-frame metadata and mobile hero content retain their existing grid and padding.
- Colors and visual tokens: the transition remains black with the established `#35c9b8` editorial rule. The unrelated white panel is no longer part of the first hero state.
- Image quality and asset fidelity: the original motion reel and stills remain unchanged, uncropped in their 2.39:1 presentation, and free of transparency mixing.
- Copy and content: opening copy, selected-work title, cut counter, scrub instruction, and work action remain present but are staged sequentially.

## Interaction and Browser Verification

- Desktop cut 3 selection updates both the full-frame image and active thumbnail state.
- Mobile cut 3 selection updates `aria-current` to `미아 컷 3, 탭하여 작품 보기`.
- Global navigation remains hidden during the opening and appears when the hero reaches its active position.
- Browser console warning/error scan: clean at both viewports.
- `npm run build`: passed.
- Targeted ESLint for changed React modules: passed.
- `git diff --check`: passed.

## Comparison History

### Pass 1

- Evidence: `transition-overlap-current/desktop-1420.png`, `transition-overlap-current/mobile-560.png`.
- Result: blocked by the two P1 layer collisions and early navigation.

### Pass 2

- Evidence: `transition-overlap-fixed/11-desktop-before-after.png`, `transition-overlap-fixed/12-mobile-before-after.png`.
- Earlier P1/P2 findings are resolved by sequential section geometry, the black editorial push, the black desktop selector, and delayed navigation.
- No additional P0, P1, or P2 issue was found.

final result: passed
