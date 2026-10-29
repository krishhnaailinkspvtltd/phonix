# PHONIX / design comparison and changes

## Reference examined

Carysil: https://carysil.com/ (homepage content and structure inspected 29 October 2026).

The reference emphasizes an image-led opening, an **In Motion** three-panel campaign section, a drag/swipe **Product Range** collection, large photographic **Signature** collections, and editorial brand storytelling. These structural patterns are verifiable from its public homepage. The exact runtime timings and transition effects were not verified in an interactive browser; this redesign uses its own authored motion sequences, rather than claiming to reproduce specific Carysil transitions.

## Prior PHONIX project (before this revision)

- Blue/white version retained a **dark/light theme button** and user preference in localStorage.
- Loading intro was entirely blue and text-led, with only typographic entrance and vertical exit.
- Homepage placed the fullscreen pinned panel sequence before the product/gallery experience; imagery was also mixed with non-trade stock photographs.
- The photography-led three-panel section appeared much later in the scroll.
- GSAP motion existed but the hero/section changes were relatively restrained.

## Implemented in this revision

| Reference design principle | PHONIX implementation |
|---|---|
| Strong full-bleed hero photograph | New fullscreen hero, cinematic masking, readable copy |
| Immersive 'In Motion' imagery | Three horizontal expanding image panels, now immediately after hero |
| Drag/swipe product collection | Oversized horizontally scrollable category imagery with arrow controls |
| Signature product/story sections | Four fullscreen trade chapters with a pinned, scrubbed GSAP reveal timeline on desktop |
| Clean, consistent identity | Single navy/royal-blue and white brand system; theme switch removed |
| Premium visual rhythm | White sections, blue photography-led experiences, quiet editorial section, photo closing CTA |
| Branded loading | New white/navy typographic photo-reveal with skip and automatic exit |

## What changed in code

- `src/components/home/BlueTradeExperience.tsx`: rewritten page structure, motion timelines, interactive panels and collection.
- `src/components/common/LoadingScreen.tsx`: rewritten photographic and typographic intro.
- `src/carysil-redesign.css`: added complete single-theme styling and responsive patterns.
- `src/components/layout/Navigation.tsx`: removed theme control.
- `src/App.tsx`: no ThemeProvider; imports new theme styles and retains routes.
- `index.html`: removed stored dark/light preference bootstrap.
- Deleted unused theme-provider/toggle files.

## Important caveats

The project is a frontend demo. Product categories are illustrative; no company statistics, certifications, shipment claims or invented operational records should be presented as verified. Image attribution and source notes are in `ATTRIBUTION.md`. None of the Carysil visual assets are embedded or copied.

### Testing

- TypeScript/TSX source **syntax** checked; no syntax diagnostics.
- CSS parsed; no top-level syntax errors.
- Local image paths checked; all present.
- Full dependency installation, TypeScript typechecking, Vite build and animated browser playback **not** verified in this environment: the npm registry was unavailable (`ENOTCACHED` offline). Run `npm ci && npm run build` and inspect it on your Ubuntu computer.
