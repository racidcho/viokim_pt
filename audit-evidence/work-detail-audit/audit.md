# Work Detail Visual Audit

## Scope

- Detail hero and project information panel.
- Critic quote section.
- Desktop `1440 × 1024` and mobile `390 × 844`.

## Step 1 — Desktop detail hero

Health: needs redesign.

- The off-white panel covers roughly the lower half of the hero and masks the subject, spatial depth, and lighting relationship in the still.
- The panel repeats a large-poster hierarchy even though the image should be the primary proof of cinematography.
- Recommended structure: render the complete 2.39:1 image first, then place a compact off-white information band below it with only a `40–48px` overlap.
- Recommended desktop panel: `max-width: 1200px`, `min-height: 220–260px`, title `clamp(3.5rem, 6vw, 5.5rem)`, two-column title/metadata layout.

## Step 2 — Desktop critic quote

Health: poor readability.

- Measured style: `72px` font size, `75.6px` line height, `-3.24px` letter spacing, and a `1024px` text measure.
- The quote reads as a display poster instead of editorial prose. Synthetic Korean italic and aggressive negative tracking merge syllable blocks and produce six oversized lines.
- Recommended desktop quote: Korean sans or Korean serif without synthetic italic, `36–44px`, `line-height: 1.38–1.45`, `letter-spacing: -0.01em` to `-0.015em`, and `max-width: 760–820px`.
- Keep the attribution close to the quote with a `20–24px` gap and reduce its tracking to about `0.12em`.

## Step 3 — Mobile detail hero

Health: needs redesign.

- The card occupies about `357px` of an `844px` viewport and still overlays the lower portion of the photograph.
- Recommended mobile structure: full-width 2.39:1 still in normal document flow, followed by the information card with no overlap.
- Recommended mobile panel: `20–24px` padding, title `44–52px`, English title `24–28px`, metadata in a 2 × 2 grid.

## Step 4 — Mobile critic quote

Health: poor readability.

- Measured style: `38.4px` font size, `40.32px` line height, `-1.728px` letter spacing, and a `335px` text measure.
- The negative tracking is too strong for Korean at this width, and the line height leaves almost no breathing room.
- Recommended mobile quote: `26–30px`, `line-height: 1.42–1.5`, `letter-spacing: -0.005em` to `-0.01em`, normal roman rather than synthetic italic, with `24px` side padding.

## Unified direction

- Treat film imagery as primary content and off-white as a compact information layer.
- Use `object-fit: contain` for any interaction or screen that promises frame viewing.
- Permit `cover` only for atmospheric backgrounds where the image is not presented as the actual frame.
- Keep the teal accent, mono metadata, hard cuts, and black/off-white palette.
- Use display typography for short titles; use reading typography for synopsis, cinematography notes, and critic quotes.

## Accessibility risks

- Oversized tightly tracked Korean reduces legibility for low-vision and cognitive-accessibility users.
- Text hierarchy currently depends heavily on size rather than spacing, weight, and grouping.
- Screenshot evidence cannot confirm screen-reader behavior, zoom reflow, reduced motion, or complete keyboard order.
