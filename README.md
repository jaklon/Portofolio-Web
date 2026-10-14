# Jascon Kembuan Portfolio

A portfolio for Jascon Johanest Kembuan, redesigned as Jascon Interactive Studio: site-wide selectable photographic backgrounds, glass surfaces, lavender accents, sculptural typography, an interactive project coverflow, and a personal 3D portrait.

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

JV Story has no visible link in the public navigation. Its entry opens only after holding the header brand for two seconds or pressing Ctrl+Alt+J, and disappears on Escape, close, page navigation, or reload. The entry opens `/jv-story/` through a normal page navigation. This interaction hides the entry from ordinary browsing; Google authentication in JV Story controls access to the memories. JV Story is a separate application, deployed into the domain's `jv-story` folder. The portfolio's Apache rules pass that path and its nested routes to JV Story's own configuration.

## Project media

Circular Waste, Lippi Mining, Carbon Treat, and Alpha Power use their actual website logos and homepage screenshots in `public/projects`. Their square covers appear first in the Home carousel. Work cards display a separate logo/domain header and a landscape homepage preview; case studies show the full homepage capture and link to the live website. Asset sources and capture details are recorded in `docs/project-media-sources.json`.

The remaining three projects retain original SVG concept illustrations in `public/covers`. Regenerate those with `node scripts/make-project-covers.mjs`. To regenerate the four website covers, run `node scripts/prepare-project-previews.mjs` with Sharp available (or set `PROJECT_IMAGE_RUNTIME` to a Node packages directory containing Sharp). Original JPEG captures are preserved in the ignored `backups/project-captures` directory.

Publication-approved screenshots can be added to each project's `media` array in `src/data/portfolio.ts`; an optional `cover` provides its square carousel preview, and `logo` supplies the separate Work header mark. Each media record requires a source path, accurate alt text, width, and height. The user explicitly requested the four public website screenshots and logos above. Obtain permission before adding other client or internal media.

The Mandiri Sekuritas case study must remain public-safe. It should never include internal screenshots, architecture, operational data, workflows, or credentials.

## Personal 3D hero

The Home hero displays the user's supplied `avatar.glb` from `public/models/avatar.glb`. The file is copied unchanged from the supplied Downloads asset. It includes a Mixamo-style rig with 65 joints, embedded textures, and Meshopt-compressed geometry, decoded locally by Three.js. No Spline upload or external model hosting is required.

The model is framed as an upper-body portrait. Its head follows the cursor with bounded yaw/pitch, while the chest and body turn slightly. Movement eases into place and returns to center when the cursor leaves the window or the page scrolls. Pause keeps the portrait visible. Reduced-motion users start with a still portrait and can explicitly enable movement.

The redesigned portrait card uses a translucent glass surface, an arched frame, soft lavender lighting, and a separate identity panel for Jascon's name and practice areas. The pause/resume control sits in the top corner. The lower arrow opens About from Home and goes to the contact footer on About. These decorative layers use local CSS and preserve the original GLB and cursor-following rig.

Three.js loads when the card approaches the viewport. Rendering stops when paused, off screen, in a hidden tab, or once the cursor movement settles. GPU resources, image bitmaps, listeners, and pending downloads are released when the viewer unmounts. Loading/WebGL errors offer a retry. Pointer-capable touch devices can move the portrait by moving a finger without trapping vertical scrolling.

Adjust the asset path, source orientation, portrait height, and camera framing in `src/data/hero.ts`. The supplied file faces +X, so its starting Y rotation is -90 degrees. Run `node scripts/inspect-avatar.mjs` to verify the embedded geometry and rig. Rendering requires WebGL 2; the original GLB is approximately 7.3 MB, and no network performance benchmark has been measured.

## Shared backgrounds

Use **Change background** on Home to reach the filmstrip. Pick a frame, use the previous/next buttons, drag horizontally, or use the arrow, Home, and End keys. The selection applies to every route, including About, Work, project details, and missing pages, and is saved locally in the browser. Vertical scrolling continues normally over the carousel.

The five user-selected wallpapers are defined in `src/data/home-wallpapers.ts`. One backdrop in the persistent site shell retains the original image colours beneath a fixed dark wash. All pages use light text and translucent dark surfaces to preserve readability. Project previews and the personal 3D avatar remain independent of the selected wallpaper.

Responsive WebP images (1920 and 960 px) and small filmstrip thumbnails are local files in `public/wallpapers`. The full originals stay in the ignored `backups/home-wallpaper-originals` folder. Rebuild responsive copies with `python scripts/optimize-home-wallpapers.py` using Pillow. Each active scene links to its Wallhaven source; retrieved metadata is recorded in `docs/home-wallpaper-sources.json`.

## Component sources and recovery

The user's supplied Spline/Card/Spotlight prompt, Ruixen UI's Coverflow Carousel bookmark, and later supplied Hero Carousel, SphereImageGrid, CinematicFooter, and GlowCard prompts form the imported foundation. Other layouts, components, illustrations, and interactions are original. See `docs/component-sources.md`.

The previous design is preserved in `backups/before-interactive-studio`, excluded from lint and test discovery.

## Interactive toolkit

The Home introduction replaces the former monogram illustration with a rotating logo sphere, adapted from the user's supplied `SphereImageGrid` prompt. Its outer panel is fully transparent, exposing the selected Home wallpaper. `src/data/toolkit.ts` contains 34 tools and technologies grounded in the existing portfolio and the user's named security tools: Gophish, Tenable, Trend Micro, Microsoft LAPS, and CyberArk PAM. Categories cover Frontend, Backend, AI & Data, DevOps, Mobile, and Cybersecurity.

Drag horizontally on touch screens or in any direction with a mouse. The focused sphere also accepts arrow keys and Home. Selecting a logo opens its name, category, and brief usage context; Escape or the close button dismisses the detail dialog and restores focus. **Browse all** provides an accessible list including the logos at the back of the sphere. Rotation runs automatically, including during hover and keyboard focus, without play/pause buttons. Reduced-motion preferences retain a still sphere with manual controls. Normal vertical page scrolling remains available.

The 34 SVG files in `public/logos` load locally: 27 brand marks and seven explicit text badges for protocols, algorithms, or tools without a verified standalone logo. Sources and handling notes are recorded in `docs/tool-logo-sources.json`. Regenerate them with `node scripts/prepare-tool-logos.mjs`; Simple Icons is used only by this preparation script, not shipped as a runtime icon package. No 21st prompt generation or MCP retrieval is needed for this component.

The sphere changes DOM transforms per animation frame without rerendering React. Rendering suspends off screen, in hidden tabs, or while details are open. Observers, listeners, and animation frames are cleaned up on unmount. Interaction and geometry tests cover filtering, reduced motion, continuous rotation, dialog focus/scroll restoration, and click-versus-drag behavior.

## Contact footer

The shared footer adapts the user-supplied CinematicFooter prompt with a diagonal marquee, soft aurora, giant JASCON lettering, and glass contact buttons. **Email Jascon** opens the existing professional email, **Connect on LinkedIn** opens the verified profile, and the copy button provides clipboard confirmation or a manual-copy fallback. Contact details remain defined in `src/data/portfolio.ts`.

Tall screens reveal a fixed footer through a clipped curtain. Short windows and reduced-motion users get normal document flow so all actions remain reachable. Mouse magnetism is restricted to fine pointers; keyboard focus reveals the curtain without animation. The shared footer uses the same dark theme on every route.

## What I Bring

The Home practice cards adapt the user-supplied `GlowCard` prompt in `src/components/ui/spotlight-card.tsx`. Web, AI, and Security retain their verified content inside translucent cards with colored and white border highlights plus a soft outer glow. The highlight follows the mouse and shifts hue across the viewport. Cards form three columns on larger screens and stack on phones.

Styles are scoped in `spotlight-card.css`, with no per-card injected stylesheet. Pointer work is batched per animation frame, tracks scrolling, and cleans up on unmount. Touch scrolling stays native; reduced-motion or coarse-pointer users receive still cards. The separate `SpotlightCard` export remains available. No additional package or 21st retrieval is required.

## About and Work

About contains one profile section: a short introduction, the original 3D portrait, verified current experience, education and credential, and counts derived from the portfolio data. Links lead to Work and the shared contact footer. Work uses landscape glass cards with original website logos, screenshots, technology tags, and the existing URL-based category filters. Academic and confidential projects retain clearly labeled concept covers. Case-study surfaces follow the same shared theme. Responsive styles live in `src/StudioPages.css`; prior page components are preserved in the ignored `backups/about-work-before-redesign` directory.

## Rumahweb deployment

The production package targets `https://jascon.my.id/` in a dedicated cPanel document root. Run `npm run build`, then `python scripts/package-rumahweb.py` to create the verified website ZIP, SHA-256 checksum, file manifest, and Indonesian upload guide in the Git-ignored `deployment/` directory. The archive includes hidden `.htaccess` at its root, explicit Unix file permissions `0644` and directory permissions `0755`, domain-specific HTTPS redirects, SPA routing, asset caching, `robots.txt`, and a sitemap generated from the project slugs. Read `docs/deployment-rumahweb.md` before uploading, especially when sharing one hosting account with other domains.

## Privacy

Only Jascon's professional email and LinkedIn profile are public. The source intentionally omits phone number, birth information, precise location, unverified GitHub profiles, and the original downloadable CV.
