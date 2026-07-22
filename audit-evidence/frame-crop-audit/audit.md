# Frame Scrub Audit

## Audit scope

- Surface: home hero `MOVE TO SCRUB FRAMES`
- Goal: let visitors understand the cinematographer's composition quickly without video.
- Evidence: production desktop and mobile captures at `CUT 05`.

## Step 1 — Desktop frame scrub

Health: needs redesign.

- The hard-cut response is immediate and the thumbnail state is understandable.
- The image is rendered as a full-viewport `cover` background while the identity panel covers most of it.
- A 2.39:1 source placed in the desktop viewport is already cropped before the panel overlay is considered. The visible result is mainly the right edge of the composition.
- The label promises that the visitor is scrubbing frames, but the visitor is actually scrubbing atmospheric crops.

## Step 2 — Mobile frame scrub

Health: ineffective.

- A 2.39:1 source covered into a portrait viewport exposes only about 19% of its horizontal composition before the panel overlay.
- The panel then leaves only thin background strips, so frame changes are barely perceptible.
- The six-cut rail overflows horizontally, but a newly active off-screen cut is not automatically centered. In the captured `CUT 05` state, the visible rail still shows the early cuts.
- Touch has no equivalent to desktop pointer scrubbing. Discoverability depends on reading a very small English instruction and swiping the lower rail.

## Highest-impact recommendation

Keep the current `cover` image only as an atmospheric intro background. On the first scrub interaction, enter a dedicated frame-viewing mode:

- Desktop: collapse the identity panel into a slim header or side label, then show the selected image uncropped in its native 2.39:1 ratio on a black canvas using `object-fit: contain`.
- Mobile: place a full-width 2.39:1 frame directly below a compact identity block and use horizontal swipe with CSS scroll snap. Keep the active frame centered and show `05 / 06`.
- Preserve the current hard-cut rhythm and teal active state. They are strong parts of the design.
- Use device-specific instructions: `MOVE TO SCRUB` for fine pointers and `SWIPE FRAMES` for touch.

## Accessibility risks

- The small, low-contrast instruction may be missed by low-vision users.
- Pointer movement changes content without an explicit activation step; keyboard users only receive the thumbnail interaction.
- The changing frame should have a visible index and an accessible live label if the selected image meaningfully changes.

## Evidence limits

- Screenshot review confirms crop, hierarchy, and mobile visibility problems.
- Full keyboard order, reduced-motion behavior, screen-reader announcements, and touch gesture reliability require separate interaction testing.
