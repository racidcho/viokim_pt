# English Typography Simplification Design QA

## Comparison Target

- Source visual truth, current production:
  - `audit-evidence/english-typography-current/opening-desktop.png`
  - `audit-evidence/english-typography-current/opening-mobile.png`
  - `audit-evidence/english-typography-current/works-desktop.png`
  - `audit-evidence/english-typography-current/detail-mobile.png`
- Revised local implementation:
  - `audit-evidence/english-typography-fixed/opening-desktop.png`
  - `audit-evidence/english-typography-fixed/opening-mobile.png`
  - `audit-evidence/english-typography-fixed/works-desktop.png`
  - `audit-evidence/english-typography-fixed/detail-mobile.png`
- Same-viewport comparisons:
  - `audit-evidence/english-typography-fixed/compare-opening-desktop.png`
  - `audit-evidence/english-typography-fixed/compare-opening-mobile.png`
  - `audit-evidence/english-typography-fixed/compare-works-desktop.png`
  - `audit-evidence/english-typography-fixed/compare-detail-mobile.png`
- Viewports: desktop 1440 x 1000, mobile 390 x 844.

## Findings

### Source Pass

- P1, English typography: the interface mixed Geist sans, technical mono, and Playfair Display serif italic.
- The serif italic appeared in the opening project name, section headings, portfolio title treatments, and work-detail English titles.
- Because the italic treatment repeated at several unrelated hierarchy levels, the portfolio felt typographically busy instead of editorially controlled.

### Fixes Applied

- Reduced the English system to two families: Geist sans for names and headings, and system mono for technical metadata and navigation labels.
- Removed the Playfair Display network import and all English serif-italic treatments.
- Standardized English display headings with one upright semibold treatment while retaining size, spacing, and teal color as the hierarchy tools.
- Preserved Korean display typography and Korean-only italic emphasis through the Pretendard-backed `font-korean-display` token.

### Final Pass

- No actionable P0, P1, or P2 issue remains.
- `BE MY BABY`, `WORKS`, `FILMOGRAPHY`, `AWARDS`, `VK FILM`, `LET'S MAKE A FRAME.`, `EVERY FRAME TELLS A STORY.`, and `SELECTED CUTS` now use the same upright Geist voice.
- All audited English display nodes compute to `Geist, sans-serif`, `font-style: normal`.
- Technical labels continue to compute to the system monospace stack.
- No English display heading overflows its content box at either mobile or desktop viewport.

## Required Fidelity Surfaces

- Fonts and typography: English is limited to Geist sans plus mono; Korean display copy and Korean italic emphasis remain unchanged.
- Spacing and layout rhythm: the existing section dimensions, panel spacing, line breaks, and opening timing are preserved; tighter sans tracking maintains the original editorial scale.
- Colors and visual tokens: black, warm white, and `#35c9b8` are unchanged; teal emphasis replaces italic contrast where needed.
- Image quality and asset fidelity: opening motion, still crops, aspect ratios, and detail-page imagery are untouched.
- Copy and content: all project names, navigation labels, technical metadata, section titles, and Korean copy remain unchanged.

## Interaction and Browser Verification

- Opening scroll, skip link, works navigation, selected-work interaction, and work-detail routing remain functional.
- Browser console warning/error scan: clean.
- `npm run build`: passed.
- Targeted ESLint for all edited React files: passed.
- `git diff --check`: passed.

## Comparison History

### Pass 1

- Evidence: `english-typography-current/*`.
- Result: blocked by the P1 three-family English system and repeated serif italic treatment.

### Pass 2

- Evidence: `english-typography-fixed/compare-*.png`.
- The English system is now visibly calmer and more consistent across opening, index, and detail surfaces.
- No new crop, spacing, overflow, readability, or interaction issue was found.

final result: passed
