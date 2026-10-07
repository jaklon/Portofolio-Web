# Jascon Kembuan Portfolio

A portfolio for Jascon Johanest Kembuan, redesigned as Jascon Interactive Studio: selectable photographic Home backgrounds, cobalt accents, sculptural typography, an interactive project coverflow, and a selectable career journey.

## Stack

- React and TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion for React
- Lazy Three.js GLB avatar with cursor-driven head and body movement
- Vitest and Testing Library

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Routes

- `/` — landing and introduction
- `/about` — profile, experience, education, skills, and achievements
- `/projects` — filterable project catalogue
- `/projects/:slug` — project case studies

## Project media

Circular Waste, Lippi Mining, Carbon Treat, and Alpha Power use their actual website logos and homepage screenshots in `public/projects`. Their square covers appear first in the Home carousel and on the Work cards; case studies show the full homepage capture and link to the live website. Asset sources and capture details are recorded in `docs/project-media-sources.json`.

The remaining three projects retain original SVG concept illustrations in `public/covers`. Regenerate those with `node scripts/make-project-covers.mjs`. To regenerate the four website covers, run `node scripts/prepare-project-previews.mjs` with Sharp available (or set `PROJECT_IMAGE_RUNTIME` to a Node packages directory containing Sharp). Original JPEG captures are preserved in the ignored `backups/project-captures` directory.

Publication-approved screenshots can be added to each project's `media` array in `src/data/portfolio.ts`; an optional `cover` provides its square carousel/Work preview. Each record requires a source path, accurate alt text, width, and height. The user explicitly requested the four public website screenshots and logos above. Obtain permission before adding other client or internal media.

The Mandiri Sekuritas case study must remain public-safe. It should never include internal screenshots, architecture, operational data, workflows, or credentials.

## Personal 3D hero

The Home hero displays the user's supplied `avatar.glb` from `public/models/avatar.glb`. The file is copied unchanged from the supplied Downloads asset. It includes a Mixamo-style rig with 65 joints, embedded textures, and Meshopt-compressed geometry, decoded locally by Three.js. No Spline upload or external model hosting is required.

The model is framed as an upper-body portrait. Its head follows the cursor with bounded yaw/pitch, while the chest and body turn slightly. Movement eases into place and returns to center when the cursor leaves the window or the page scrolls. Pause keeps the portrait visible. Reduced-motion users start with a still portrait and can explicitly enable movement.

Three.js loads when the card approaches the viewport. Rendering stops when paused, off screen, in a hidden tab, or once the cursor movement settles. GPU resources, image bitmaps, listeners, and pending downloads are released when the viewer unmounts. Loading/WebGL errors offer a retry. Pointer-capable touch devices can move the portrait by moving a finger without trapping vertical scrolling.

Adjust the asset path, source orientation, portrait height, and camera framing in `src/data/hero.ts`. The supplied file faces +X, so its starting Y rotation is -90 degrees. Run `node scripts/inspect-avatar.mjs` to verify the embedded geometry and rig. Rendering requires WebGL 2; the original GLB is approximately 7.3 MB, and no network performance benchmark has been measured.

## Home backgrounds

Use **Change background** below the hero to reach the filmstrip. Pick a frame, use the previous/next buttons, drag horizontally, or use the arrow, Home, and End keys. The selection applies to all of Home and is saved locally in the browser. Vertical scrolling continues normally over the carousel.

The five user-selected wallpapers are defined in `src/data/home-wallpapers.ts`. Original image colours are retained beneath a fixed dark wash; light text and translucent dark surfaces preserve readability. About and Work retain their ivory theme. Project previews and the personal 3D avatar remain independent of the selected wallpaper.

Responsive WebP images (1920 and 960 px) and small filmstrip thumbnails are local files in `public/wallpapers`. The full originals stay in the ignored `backups/home-wallpaper-originals` folder. Rebuild responsive copies with `python scripts/optimize-home-wallpapers.py` using Pillow. Each active scene links to its Wallhaven source; retrieved metadata is recorded in `docs/home-wallpaper-sources.json`.

## Component sources and recovery

The user's supplied Spline/Card/Spotlight prompt, Ruixen UI's Coverflow Carousel bookmark, and later supplied Hero Carousel, SphereImageGrid, and CinematicFooter prompts form the imported foundation. Other layouts, components, illustrations, and interactions are original. See `docs/component-sources.md`.

The previous design is preserved in `backups/before-interactive-studio`, excluded from lint and test discovery.

## Interactive toolkit

The Home introduction replaces the former monogram illustration with a rotating logo sphere, adapted from the user's supplied `SphereImageGrid` prompt. Its outer panel is fully transparent, exposing the selected Home wallpaper. `src/data/toolkit.ts` contains 34 tools and technologies grounded in the existing portfolio and the user's named security tools: Gophish, Tenable, Trend Micro, Microsoft LAPS, and CyberArk PAM. Categories cover Frontend, Backend, AI & Data, DevOps, Mobile, and Cybersecurity.

Drag horizontally on touch screens or in any direction with a mouse. The focused sphere also accepts arrow keys and Home. Selecting a logo opens its name, category, and brief usage context; Escape or the close button dismisses the detail dialog and restores focus. **Browse all** provides an accessible list including the logos at the back of the sphere. Rotation runs automatically, including during hover and keyboard focus, without play/pause buttons. Reduced-motion preferences retain a still sphere with manual controls. Normal vertical page scrolling remains available.

The 34 SVG files in `public/logos` load locally: 27 brand marks and seven explicit text badges for protocols, algorithms, or tools without a verified standalone logo. Sources and handling notes are recorded in `docs/tool-logo-sources.json`. Regenerate them with `node scripts/prepare-tool-logos.mjs`; Simple Icons is used only by this preparation script, not shipped as a runtime icon package. No 21st prompt generation or MCP retrieval is needed for this component.

The sphere changes DOM transforms per animation frame without rerendering React. Rendering suspends off screen, in hidden tabs, or while details are open. Observers, listeners, and animation frames are cleaned up on unmount. Interaction and geometry tests cover filtering, reduced motion, continuous rotation, dialog focus/scroll restoration, and click-versus-drag behavior.

## Contact footer

The shared footer adapts the user-supplied CinematicFooter prompt with a diagonal marquee, soft aurora, giant JASCON lettering, and glass contact buttons. **Email Jascon** opens the existing professional email, **Connect on LinkedIn** opens the verified profile, and the copy button provides clipboard confirmation or a manual-copy fallback. Contact details remain defined in `src/data/portfolio.ts`.

Tall screens reveal a fixed footer through a clipped curtain. Short windows and reduced-motion users get normal document flow so all actions remain reachable. Mouse magnetism is restricted to fine pointers; keyboard focus reveals the curtain without animation. Home uses its dark theme, while About and Work retain their ivory theme.

## Privacy

Only Jascon's professional email and LinkedIn profile are public. The source intentionally omits phone number, birth information, precise location, unverified GitHub profiles, and the original downloadable CV.
