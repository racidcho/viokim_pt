# Scroll-Driven Aperture Design QA

## Comparison Target

- Source desktop: `audit-evidence/scroll-aperture/01-source-desktop.png`
- Source mobile: `audit-evidence/aperture-opening/07-mobile-closed-final.png`
- Source open states: `audit-evidence/aperture-opening/02-desktop-open.png`, `audit-evidence/aperture-opening/05-mobile-open-final.png`
- Implementation desktop: `audit-evidence/scroll-aperture/03-implementation-desktop-top.png`, `04-implementation-desktop-open.png`, `05-implementation-desktop-handoff.png`
- Implementation mobile: `audit-evidence/scroll-aperture/06-implementation-mobile-top.png`, `07-implementation-mobile-open.png`, `08-implementation-mobile-handoff.png`
- Normalized full-view comparisons: `09-desktop-source-comparison.png`, `10-mobile-source-comparison.png`
- Normalized open-state comparisons: `11-desktop-open-comparison.png`, `12-mobile-open-comparison.png`
- Tested viewports: 1440 x 1024 CSS px and 390 x 844 CSS px at device scale factor 1.
- Desktop source/implementation captures were normalized to 720 x 512 per side for comparison. Mobile captures were normalized to 390 x 844 per side.

## Intended Experience

The opening is no longer a modal or a click/hold gate. It is a document-level cinematic scroll sequence: the VIO/KIM film mask establishes identity, native vertical scrolling opens the frame to an uncropped 2.39:1 composition, the film title resolves, and the stage crossfades into the existing hero. Desktop uses a 240svh sequence with subtle pointer parallax; mobile uses a shorter 190svh sequence with native swipe scrolling.

## Full-view and Focused Comparisons

- `09-desktop-source-comparison.png` confirms the desktop hierarchy, typography, black canvas, teal rules, film-mask proportions, and negative-space rhythm remain faithful while the interaction cue changes from hold to scroll.
- `10-mobile-source-comparison.png` confirms the mobile wordmark, role/location labels, full-bleed film mask, title hierarchy, and teal progress language remain visually consistent.
- `11-desktop-open-comparison.png` and `12-mobile-open-comparison.png` confirm the opened frame preserves the source's 2.39:1 composition without cover cropping or stretching.
- Top, open, and handoff states were inspected separately because the source still cannot represent scroll progress or the hero crossfade.

## Findings and Fix History

### Pass 1

- P2: the initial document flow left a black gap between the opening and the hero.
- Fix: overlapped the sequence and hero with a controlled negative block margin.

### Pass 2

- P2: a `-100svh` overlap exposed the hero at the bottom of the initial mobile viewport.
- Fix: adjusted the overlap to `-90svh`; the final mobile top state reports the hero at 844 px, directly below the viewport.

### Pass 3

- P2: the mobile mask exposed a narrow video strip below the KIM letterform.
- Fix: extended the mask bounds and positioned the word blocks with `svh` values.
- P2: the opening lost immediate project context after removing the modal controls.
- Fix: restored `BE MY BABY · OPENING STUDY` in the opening metadata.

### Final Pass

- No actionable P0, P1, or P2 visual mismatch remains.
- Fonts and typography: the existing sans/mono/serif system and tight display tracking preserve the cinematography identity.
- Spacing and layout rhythm: the opening uses deliberate negative space, a central film gate, and a continuous handoff rather than disconnected panels.
- Colors and visual tokens: black, soft white, and `#35c9b8` remain consistent across both viewports.
- Image quality and asset fidelity: the existing 1280 x 536 H.264 reel remains the motion source; the open state uses `object-fit: contain`.
- Copy and content: role, location, scroll/swipe cue, project title, opening-study label, and skip action are visible in the appropriate states.

## Primary Interactions Tested

- Opening appears on every page load; no session or local-storage suppression is used.
- Native wheel/trackpad scrolling advances the desktop sequence.
- Native vertical swipe scrolling advances the mobile sequence; body Y overflow remains enabled.
- Scrolling backward restores the opening state.
- The opened frame reports a 2.39:1 ratio on desktop and mobile.
- The handoff places the hero at 116 px on desktop and 84 px on mobile while the opening fades.
- `SKIP OPENING` brings `#hero` into view without locking document scroll.
- The opening is exposed as a labeled region, not a modal dialog.
- Reduced-motion users receive a static open-frame treatment.
- Both videos reported `readyState: 4`, 1280 x 536, muted, and playing.
- Browser console warning/error scan: clean.

## Verification

- `npm run build`: passed.
- Targeted ESLint for the four changed React modules: passed.
- `git diff --check`: passed.

final result: passed
