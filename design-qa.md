# Mobile Cold Open Design QA

## Comparison Target

- Source visual truth: `/Users/racidcho/.codex/generated_images/019f88ac-b441-7e81-9f4d-d180b99399e5/exec-75533683-4fc7-4865-8951-4df439ae2e36.png`
- Implementation screenshot: `/Users/racidcho/.codex/visualizations/2026/07/22/019f88ac-b441-7e81-9f4d-d180b99399e5/cold-open-option-2/03-memory-clean.png`
- Side-by-side evidence: `/Users/racidcho/.codex/visualizations/2026/07/22/019f88ac-b441-7e81-9f4d-d180b99399e5/cold-open-option-2/compare-source-vs-implementation.png`
- Viewport: 390 x 844 CSS px, device scale factor 1
- Source pixels: 852 x 1846, proportionally normalized to 390 x 844
- Implementation pixels: 390 x 844
- State: `03 / 03 · MEMORY`, all three frames revealed, selected-work metadata visible

## Full-view Comparison Evidence

The implementation preserves the source composition: black cinema canvas, large VIO KIM identity, role/location line, Korean statement, cyan progress rule, three true-aspect film frames, cut/timecode labels, and selected-work metadata. The long poster is adapted into a single mobile viewport without cropping the stills. The identity block is intentionally enlarged for a real 390 px screen, and the three frames use equal tracks so the complete sequence remains visible on both 390 x 844 and 375 x 667 devices.

## Focused-region Comparison Evidence

A separate crop was not required because the normalized side-by-side image keeps the title, statement, progress labels, frame captions, timecodes, and footer legible at 1x. The implementation also uses the original production stills rather than approximated or generated replacements.

## Findings

- No actionable P0, P1, or P2 mismatch remains.
- Fonts and typography: the sans/mono/serif hierarchy, condensed tracking, and italic English film title follow the source. The mobile title is larger than the concept poster by design to preserve first-glance identity at 390 px.
- Spacing and layout rhythm: the main vertical beats and black negative space match the source. At 375 x 667, the last frame ends at 605 px and metadata ends at 659 px, with zero horizontal overflow.
- Colors and visual tokens: black, off-white, muted white, and the existing `#35c9b8` highlight token match the selected direction.
- Image quality and asset fidelity: all three stills are exact project assets, shown with `object-fit: contain`; no frame is cropped or stretched.
- Copy and content: the selected Korean statement, LIGHT/MOVEMENT/MEMORY labels, film title, work index, year, and skip affordance are present. The source's ambiguous `03 / 05` is intentionally clarified as a live `01 / 03` through `03 / 03` sequence.
- Accessibility and interaction: the whole overlay is a keyboard-focusable skip button, decorative images have empty alt text, and reduced-motion users bypass the opening.

## Comparison History

- Initial comparison found no P0/P1/P2 mismatch. The metadata reveal was advanced from 4.2 seconds to 3.6 seconds as a P3 timing refinement so the completed title card remains readable before the exit cut.
- Post-refinement evidence: `03-memory-clean.png` shows the final frame and metadata fully visible at opacity 1 before the transition.

## Implementation Checklist

- [x] Three-beat 5.6 second sequence
- [x] True-aspect, uncropped source stills
- [x] Tap/keyboard skip
- [x] Replay on every page visit or reload
- [x] Reduced-motion bypass
- [x] 390 x 844 and 375 x 667 fit checks
- [x] Desktop Hero remains unchanged

## Follow-up Polish

- P3: after real-user review, the 1.7-second beat spacing can be tuned without changing the visual system.

final result: passed
