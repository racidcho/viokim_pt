# Design QA — FRAME VIEWER + WORK DETAIL

**Source visual truth**

- `audit-evidence/frame-crop-audit/audit.md` and its desktop/mobile source captures.
- `audit-evidence/work-detail-audit/audit.md` and its desktop/mobile source captures.
- The accepted design target is the audited transition from atmospheric crop to uncropped frame viewing, plus a compact detail-information band and reading-scale critic quote.

**Rendered implementation evidence**

- `qa-evidence/e2e-frame-detail/01-desktop-intro.png` — desktop brand mode.
- `qa-evidence/e2e-frame-detail/02-desktop-full-frame.png` — desktop `CUT 05` full-frame mode.
- `qa-evidence/e2e-frame-detail/03-mobile-frame-gallery.png` — mobile `CUT 05` swipe gallery.
- `qa-evidence/e2e-frame-detail/04-detail-hero-desktop.png` — desktop work detail hero.
- `qa-evidence/e2e-frame-detail/05-detail-quote-desktop.png` — desktop critic quote.
- `qa-evidence/e2e-frame-detail/06-detail-hero-mobile.png` — mobile work detail hero.
- `qa-evidence/e2e-frame-detail/07-detail-quote-mobile.png` — mobile critic quote.
- Combined comparison inputs: `08-home-desktop-before-after.png` through `13-quote-mobile-before-after.png`.

**Viewport and normalization**

- Desktop CSS viewport: `1440 × 1024`; implementation captures: `1425 × 1013`; `devicePixelRatio: 1`. The in-app browser capture excludes its scrollbar edge.
- Mobile CSS viewport: `390 × 844`; implementation captures: `375 × 812`; `devicePixelRatio: 1`. The saved bitmap excludes browser scrollbar/chrome edges.
- Desktop comparison pairs were proportionally normalized to `720px` high without cropping.
- Mobile comparison pairs were proportionally normalized to `844px` high without cropping.
- Source desktop pixels range from `1280 × 720` to `1440 × 1024`; source mobile pixels are `390 × 844` or `375 × 812`.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: critic quotes now use Geist/Pretendard at `43.2px / 62.2px` on desktop and `28px / 40.3px` on mobile, normal style, with restrained tracking (`-0.012em`). The short English work title retains the Playfair italic display treatment.
- Spacing and layout rhythm: the detail hero information band is `243px` high on desktop and overlaps the image by exactly `48px`; mobile overlap is `0px`. Full-frame mode gives the image a dedicated black canvas, while the mobile frame rail is separated from the identity card.
- Colors and visual tokens: black, off-white `#ecebe6`, and teal `#35c9b8` remain consistent. Active frames, instructions, focus states, and release-note labels use the existing teal rather than adding a new state color.
- Image quality and asset fidelity: desktop full-frame rendering measures `2.388:1`, identical to the `1600 × 670` source. The detail hero renders at `2.39:1` with `object-fit: contain`. All photography is real project imagery; no generated or code-drawn substitutes are present.
- Copy and content: device-specific instructions (`MOVE HORIZONTALLY TO SCRUB`, `SWIPE FRAMES`) describe the actual controls. Work title, format, role, director, genre, runtime, quote, and attribution remain sourced from the project data.
- Icons and controls: existing Lucide navigation/close arrows remain optically consistent. Native buttons expose selected state with `aria-pressed`; hidden mode controls are also `visibility: hidden` so they do not remain keyboard-focusable.

## Focused comparison evidence

- `08-home-desktop-before-after.png`: confirms the original atmospheric crop is replaced by a dedicated uncropped frame canvas after interaction.
- `09-home-mobile-before-after.png`: confirms the nearly hidden background crop becomes a visible full-ratio swipe frame with centered active state.
- `10-detail-desktop-before-after.png` and `12-detail-mobile-before-after.png`: confirm the hero still is no longer obscured by the information panel.
- `11-quote-desktop-before-after.png` and `13-quote-mobile-before-after.png`: make size, tracking, line-height, measure, and synthetic-italic corrections readable at comparison scale.

## Comparison history

1. Source P1: frame scrubbing changed a cropped background while the identity panel concealed most of the composition.
   - Fix: introduced an explicit full-frame mode with `object-fit: contain`, a black canvas, counter, six-cut rail, close action, and pointer scrub.
   - Evidence: `02-desktop-full-frame.png` and `08-home-desktop-before-after.png`; rendered/source ratios both measure `2.388`.
2. Source P1: mobile frame changes were barely visible, relied on a desktop interaction metaphor, and could leave the active cut off-screen.
   - Fix: replaced the mobile overlay with a full-width 2.39:1 scroll-snap gallery, `SWIPE FRAMES`, counter, and six 44px selection buttons that auto-align the selected frame.
   - Evidence: `03-mobile-frame-gallery.png` and `09-home-mobile-before-after.png`; `CUT 05` is visible and selected.
3. Source P2: the work-detail off-white panel covered the lower half of the hero image.
   - Fix: made the image an uncropped aspect-ratio block followed by a compact information band; desktop overlap is 48px and mobile overlap is zero.
   - Evidence: `04-detail-hero-desktop.png`, `06-detail-hero-mobile.png`, `10-detail-desktop-before-after.png`, and `12-detail-mobile-before-after.png`.
4. Source P1: critic quote typography measured `72px`, `75.6px` line-height, `-3.24px` tracking on desktop and `38.4px`, `40.32px`, `-1.728px` on mobile.
   - Fix: switched the long Korean quote to normal reading typography, a narrower measure, increased relative line-height, and restrained tracking.
   - Evidence: `05-detail-quote-desktop.png`, `07-detail-quote-mobile.png`, `11-quote-desktop-before-after.png`, and `13-quote-mobile-before-after.png`.
5. Implementation P2 found during interaction QA: tying full-frame visibility to hero scroll progress could hide the viewer after automated or user scroll-to-control behavior.
   - Fix: made frame mode explicit and persistent until `CLOSE` or route navigation.
   - Post-fix evidence: frame mode remains visible at the top, `CLOSE` restores the identity panel, and `VIEW WORK` routes to `/work/be-my-baby`.
6. Implementation P2 found during accessibility QA: opacity-hidden mode controls could remain in the focus model.
   - Fix: added `visibility: hidden` alongside opacity/pointer-state changes.
   - Post-fix evidence: the accessibility snapshot in brand mode no longer exposes full-frame controls, while frame mode exposes `CLOSE`, six cut buttons, and `VIEW WORK`.

## Primary interactions tested

- Desktop cut selection enters full-frame mode.
- Horizontal pointer movement changes the selected cut and updates the live label.
- `CLOSE` restores brand mode.
- `VIEW WORK` routes through the slate transition to `/work/be-my-baby`.
- Mobile cut buttons scroll the snap gallery to the selected full frame and update `aria-pressed`.
- Detail hero and quote render at desktop and mobile breakpoints.
- Browser console checked: no error-level messages.

## Open questions

- None blocking. Real video can be added later without changing this still-first interaction architecture.

## Follow-up polish

- P3: add a subtle touch-drag progress indicator only after real-device testing confirms users need more swipe feedback.

## Implementation checklist

- [x] Preserve the current brand intro.
- [x] Separate atmospheric crop from full-frame viewing.
- [x] Implement mobile swipe and active-frame centering.
- [x] Preserve native image aspect ratios.
- [x] Reduce detail-panel image obstruction.
- [x] Replace display-scale Korean quote typography with reading typography.
- [x] Verify build, lint, desktop/mobile rendering, routing, interaction, and console state.
- [x] Compare each source problem and implementation in the same visual input.

final result: passed
