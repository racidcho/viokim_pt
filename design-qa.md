# Typographic Aperture Opening Design QA

## Comparison Target

- Source visual truth: `/Users/racidcho/.codex/generated_images/019f88ac-b441-7e81-9f4d-d180b99399e5/call_77my07A7BURKuBnWio6khQwH.png`
- Final mobile implementation screenshot: `/Users/racidcho/Documents/kimi/Workspaces/pt/vio-kim-portfolio/audit-evidence/aperture-opening/07-mobile-closed-final.png`
- Final normalized comparison: `/Users/racidcho/Documents/kimi/Workspaces/pt/vio-kim-portfolio/audit-evidence/aperture-opening/08-mobile-source-comparison-final.png`
- Mobile open-frame evidence: `/Users/racidcho/Documents/kimi/Workspaces/pt/vio-kim-portfolio/audit-evidence/aperture-opening/05-mobile-open-final.png`
- Desktop closed-state evidence: `/Users/racidcho/Documents/kimi/Workspaces/pt/vio-kim-portfolio/audit-evidence/aperture-opening/09-desktop-closed-final.png`
- Desktop open-frame evidence: `/Users/racidcho/Documents/kimi/Workspaces/pt/vio-kim-portfolio/audit-evidence/aperture-opening/02-desktop-open.png`
- Mobile viewport: 390 x 844 CSS px at device scale factor 1
- Desktop viewport: 1440 x 1024 CSS px at device scale factor 1
- Source pixels: 853 x 1844, normalized to 390 x 844
- Mobile implementation pixels: 390 x 844
- Desktop implementation pixels: 1440 x 1024
- State: motion playing inside the VIO/KIM letter mask, full-width film slit closed; secondary state has the complete 2.39:1 frame open.

## Full-view Comparison Evidence

The final mobile comparison places the selected ImageGen result and the browser-rendered implementation in one 780 x 844 image. The implementation preserves the source hierarchy: black cinema canvas, teal role/location labels, oversized video-filled `VIO` and `KIM`, the centered hold slit, italic film title, primary filmography action, and motion-free fallback. The source's illustrative fingertip is intentionally represented as a live progress ring that only appears during an actual hold.

Desktop is a responsive adaptation of the selected mobile target and the agreed desktop behavior. `VIO` and `KIM` divide the horizontal canvas, the moving film remains visible inside the letterforms, pointer movement changes the video focal position, and the centered slit expands to a maximum-width complete frame without cropping.

## Focused-region Comparison Evidence

Separate open-state captures were required because the still source cannot show the interaction outcome. `05-mobile-open-final.png` and `02-desktop-open.png` verify that the film slit becomes a true 2.39:1 container, the footage switches from cropped slit treatment to `object-fit: contain`, and the filmography/selected-work actions remain readable. No additional typography crop was needed because the normalized full-view comparison keeps all labels and actions legible at 1x.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: Geist, Geist Mono-style system monospace, and the existing Playfair Display italic preserve the selected sans/mono/serif hierarchy. Display lettering uses the mock's tight tracking and strong optical weight.
- Spacing and layout rhythm: the mobile word blocks, slit, metadata, and two bottom actions follow the source's vertical beats. Desktop intentionally uses more negative space around the central film gate.
- Colors and visual tokens: the implementation uses the site's existing black, soft white, and `#35c9b8` highlight token. Contrast remains readable over every video phase.
- Image quality and asset fidelity: the opening uses the actual 1280 x 536 generated motion reel. It is neither stretched nor re-generated. The open state uses the exact 2.39:1 aspect ratio and `object-fit: contain`.
- Copy and content: `DIRECTOR OF PHOTOGRAPHY`, `SEOUL · KR`, `HOLD TO OPEN THE FRAME`, `BE MY BABY · OPENING STUDY`, `ENTER FILMOGRAPHY`, and `VIEW WITHOUT MOTION` are present.
- Interaction and accessibility: mouse movement changes focal position; a 560 ms pointer hold opens the frame; Enter/Space provides the equivalent keyboard action; Escape and `VIEW WITHOUT MOTION` dismiss the modal; reduced-motion users start directly in the static open-frame state.
- Performance: both video elements reused the same 900 KB muted H.264 resource. Browser evidence showed both at `readyState: 4`, 1280 x 536, playing and muted.
- P3 accepted variation: the exact image visible inside the letterforms changes with the live video's current frame, so subject placement will naturally differ from the static ImageGen mock.

## Comparison History

### Pass 1

- Evidence: `06-mobile-source-comparison.png`
- P2: the closed implementation omitted the source's primary `ENTER FILMOGRAPHY` action.
- P2: the mobile wordmark was visually smaller and the top metadata sat too high relative to the source.
- Fixes: added the closed-state primary action, increased the mobile display scale from 53vw to 60vw, moved the top metadata down, and raised the video-mask brightness.

### Pass 2

- Evidence: `08-mobile-source-comparison-final.png`
- The earlier hierarchy and spacing mismatches are resolved.
- No actionable P0, P1, or P2 differences remain.

## Primary Interactions Tested

- Opening appears on every home-page reload; no session or local-storage suppression is used.
- Pointer hover updated the desktop focal position from 43.33% to 56.56%.
- A 680 ms mouse hold changed `aria-pressed` to `true` and applied the open-frame state.
- The open frame reported the computed ratio `2.39 / 1`.
- `ENTER FILMOGRAPHY` removed the opening, restored body scrolling, and brought the filmography section into the viewport.
- The motion resource returned HTTP 200 with 921,349 bytes.
- Browser console warning/error scan: clean.

## Implementation Checklist

- [x] Selected option 3 faithfully recreated
- [x] Real generated video used as the typographic image source
- [x] Mobile long-press and keyboard-equivalent opening
- [x] Desktop hover and click-hold opening
- [x] Complete 2.39:1 open frame with no crop or stretch
- [x] Direct filmography and selected-work paths
- [x] Motion-free and reduced-motion fallbacks
- [x] Mobile and desktop browser captures
- [x] Browser console and video readiness checks

## Follow-up Polish

- P3: after field testing on older iPhones, the two simultaneous video decoders can be reduced to one synchronized canvas if thermal or battery impact is observed.

final result: passed
