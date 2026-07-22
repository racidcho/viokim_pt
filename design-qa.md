# Design QA — CONTROLLED FRAME redesign

**Source visual truth**

- `/Users/racidcho/.codex/visualizations/2026/07/22/019f88ac-b441-7e81-9f4d-d180b99399e5/naked-city-audit/04-naked-city-reference.jpg`
- Source pixels: `1265 × 712` at 1x density.
- Target qualities: a bright central matte panel over full-bleed film imagery, sparse navigation, oversized wordmark, one decisive accent color, and restrained editorial motion.

**Rendered implementation evidence**

- `qa-evidence/home-desktop-final-1440x1000.png` — browser-rendered home hero.
- `qa-evidence/works-desktop-1440x1000.png` — still-first desktop work index.
- `qa-evidence/detail-desktop-1440x1000.png` — work detail hero.
- `qa-evidence/home-mobile-390x844.png` — mobile hero.
- `qa-evidence/hero-reference-comparison-final.png` — source and final hero normalized into one side-by-side comparison input.
- Desktop CSS viewport: `1440 × 1000`; implementation capture pixels: `1425 × 990`; `devicePixelRatio: 1`.
- Mobile CSS viewport: `390 × 844`; `devicePixelRatio: 1`.
- Comparison normalization: both source and implementation were proportionally scaled to `720px` high and placed side by side without cropping. Differences in source aspect ratio were preserved.
- State: home hero after the 620ms panel entrance, default work filter, first project detail, and mobile default hero.

## Findings

- No actionable P0/P1/P2 findings remain.
- Fonts and typography: the final oversized VIO KIM wordmark now matches the source hierarchy while retaining the project's Geist/Pretendard and Playfair display pairing. Small navigation and metadata keep the source's compact editorial rhythm without becoming illegible.
- Spacing and layout rhythm: the centered matte panel, generous internal whitespace, edge gutters, and bottom metadata strip follow the source composition. Works and detail views use consistent hard cuts, square corners, thin rules, and editorial grids.
- Colors and visual tokens: the source blue was intentionally translated to the existing VIO KIM teal `#35c9b8`; off-white `#ecebe6`, black, and restrained opacity values form the remaining palette. Contrast is sufficient in the verified states.
- Image quality and asset fidelity: all visible photography uses the project's real film stills and portrait assets. No placeholder, CSS-drawn, or fabricated imagery is used. Natural image ratios are preserved in the work index and Frame Study.
- Copy and content: Korean/English project titles, year, role, director, genre, format, verified specs, awards, festivals, and credits come from project data. Unverified specs and the empty-video placeholder are not rendered.

## Focused comparison evidence

- A separate crop was not required: at the normalized 720px comparison height, the panel proportions, navigation scale, wordmark hierarchy, accent treatment, imagery, and bottom strip are all directly readable.
- `works-desktop-1440x1000.png` and `detail-desktop-1440x1000.png` were additionally reviewed at their native captures for crop, alignment, type wrapping, image quality, and hierarchy. These screens extend the source language rather than clone a source screen that was not provided.

## Comparison history

1. Initial comparison: `qa-evidence/hero-reference-comparison.png`.
   - Earlier P2 finding: the VIO KIM wordmark was materially smaller than the Naked City reference, weakening the first-screen identity and slowing visual recognition.
   - Fix: increased the large-screen wordmark from `128px` to `176px`, increased the intermediate responsive scale, and strengthened its weight.
2. Post-fix comparison: `qa-evidence/hero-reference-comparison-final.png`.
   - Result: the wordmark now occupies the intended dominant central zone without clipping, overpowering the metadata, or breaking the mobile composition. No further P0/P1/P2 differences were found.

## Primary interactions tested

- Home-to-Works anchor navigation.
- Selected-work preview to routed detail page through the shortened slate transition.
- Documentary filter and filtered result state.
- Detail-page lightbox open/close and accessible dialog state.
- Contact form labels, name/email/message entry, project-type selection, and enabled mail action without sending external mail during QA.
- Mobile fixed navigation open state and visible menu layout.
- Browser console checked: no error-level messages.

## Open questions

- None blocking. Video embeds will remain absent until real URLs are supplied, by design.

## Follow-up polish

- P3: when trailers or reels become available, add them only to the matching project records; the detail page already supports Vimeo and YouTube embeds.

## Implementation checklist

- [x] Still-first hero and work discovery.
- [x] One interaction grammar: cut, panel, slow push.
- [x] Natural-ratio Frame Study and accessible lightbox.
- [x] Verified-only production metadata.
- [x] Functional mailto inquiry path with fallback address.
- [x] Desktop and mobile browser QA.
- [x] Source/implementation combined comparison and post-fix pass.

final result: passed
