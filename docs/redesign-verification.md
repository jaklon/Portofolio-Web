# Redesign verification — 6 October 2026

The current implementation passes the TypeScript production build, Oxlint, and all eighteen Vitest tests in eight files.

Browser verification used the Codex in-app browser at 320, 360, 390, 833, and 1440 px viewport widths. Checked:

- Home, About, Work, a security case study, and an unknown project fallback.
- No horizontal page overflow on the checked small-screen layouts, including the longest alternate hero headline.
- Coverflow button, keyboard, and cover-click selection; caption and case-study link match the selected project.
- Career milestone selection on desktop and mobile.
- Academic, freelance, and internship filters and their URL parameters and counts.
- Mobile navigation closes after a route change and on Escape; focus returns to its toggle.
- Hero animation can be paused; contact and back-to-top links scroll to their intended sections.
- Local project covers load, and the security case study retains its public-safe content.
- No browser warning/error messages in the final inspected session.

The initial redesign used a CSS monogram sculpture while waiting for a personal model. The later user-supplied GLB integration is verified below; the sample Spline robot is not loaded.

The initial Spline prototype has been replaced in the active hero by a lazy Three.js viewer. Lighthouse, LCP, and CLS have not been measured, so the design-plan performance targets remain targets.

Original files are preserved in `backups/before-interactive-studio`.

## Home background update

The five requested Wallhaven scenes load from local responsive WebP assets. Their full-size web variants are approximately 35–208 KB; mobile variants are approximately 10–80 KB. Original downloads remain in an ignored backup folder.

Checked the background selector at 320, 390, 833, and 1440 px widths, without horizontal page overflow. The longest scene title and all controls fit the small-screen panel. Image selection changes the Home-wide photo, active frame, status, and source link together. The stage stays at `scrollLeft: 0` when frames receive focus.

The bright city wallpaper was inspected across the hero, selector, selected-work illustrations and captions, practice cards, profile, current experience, and contact/footer. Light foreground text, the fixed wash, and dark translucent surfaces maintain legibility; illustrations retain their original colours. This is visual verification, not a formal accessibility contrast audit or performance benchmark.

Browser checks also confirmed persisted selection after a reload and a round trip through About and Work. Those routes retain their ivory surfaces and do not render the fixed Home background. The new tests cover background/attribution synchronization, restored and stale saved preferences, bounded keyboard navigation, vertical versus horizontal wheel input, and blocked browser storage.

No extra 21st MCP retrievals were used. The user-provided Crafter UI Hero Carousel prompt was adapted locally.

## Personal GLB avatar

The supplied `avatar.glb` replaces the Home hero sculpture. The viewer loads the local model and its embedded textures with Three.js and the bundled Meshopt decoder. Inspection confirmed 19,895 vertices, 65 rig joints, and three embedded textures. The model faces the camera after its source orientation is corrected, with an upper-body portrait frame and soft lighting.

Browser checks confirmed left/right cursor tracking, a subtle body turn, and a frozen pose while paused. Pause/resume retains a single canvas and keeps the portrait visible. The 390 px mobile layout and the final 751 px preview have no horizontal overflow; the portrait fits the card. The earlier wide desktop preview was also visually inspected. The final preview is saved in `docs/previews/avatar-hero.jpg`.

The new tests cover motion bounds and rig orientation, retained canvas and cleanup, reduced-motion behavior, and loading failure/retry. The final build, lint, and all eighteen tests passed. The avatar runtime is lazy-loaded; Vite reports a 640.94 KB runtime chunk before compression, and the unchanged model is approximately 7.3 MB. Loading and rendering performance have not been benchmarked.

## Client website previews

The user requested actual logos and homepage captures for Circular Waste Management, Lippi Mining Consultant, Carbon Treat Indonesia, and Alpha Power. All four public websites were opened in the browser and their original logos acquired from the rendered pages. Sources, permission context, capture dimensions, and local paths are recorded in `docs/project-media-sources.json`.

The Home carousel now shows these four website covers before the three remaining concept illustrations. Every cover combines the original logo and a real homepage screenshot. The active caption, case-study link, and preview/concept label follow the selection. Work cards use square frames to retain the whole cover and logo; case studies use the homepage capture and a live website link.

Checked all seven carousel images loaded at 1440 px, selection and caption synchronization, the four Work card images and square framing, and the Circular Waste/Alpha Power case-study screenshots and live links. At 390 px the selected Carbon Treat cover, caption, and controls fit without horizontal page overflow. WebP homepage captures are approximately 74–132 KB; square covers are approximately 65–96 KB. Build, lint, and all eighteen tests passed after integration.

The later user-requested Home carousel panel is transparent, with no panel fill, blur, border, or shadow. Wallpaper remains visible behind the covers and captions. The light foreground text and dark navigation controls are retained. Current preview: `docs/previews/project-carousel-transparent.jpg`.

## Interactive toolkit sphere

The former Home monogram illustration is replaced with the adapted user-supplied SphereImageGrid. It displays 34 local tool/technology icons across six categories, including the five user-confirmed cybersecurity tools. All 34 logo images loaded in the browser. The collection contains 27 brand marks and seven documented text badges; exact sources are recorded in `tool-logo-sources.json`.

Checked the 1440 px desktop and 390 px mobile layouts with no horizontal page overflow. Native browser checks confirmed category filtering, complete-list selection, logo-click details, Escape dismissal, restored focus, and restored page scrolling. A pointer drag changed the sphere pose without opening a dialog. Touch styling preserves vertical page scrolling (`touch-action: pan-y`).

The later user requests are applied: the outer panel fill and border are fully transparent; play/pause controls are removed; automatic rotation continues during hover and focus. A live transform comparison confirmed continued movement and no sphere play/pause buttons. Logo opacity is increased from 16% to 30% at the back and from a 60% to 76% minimum at the front. The logo artwork occupies 66% of each circle, increased from 61%. Reduced-motion users retain manual controls; animation suspends off screen, in hidden tabs, and while the detail dialog is open.

All 25 tests pass, including new geometry, filtering, continuous rotation, reduced-motion, dialog-focus, and click-versus-drag checks. Lint and production build pass. Vite retains its chunk-size warning for the main application and the lazy avatar runtime; no performance benchmark was added. Current visual proof: `docs/previews/toolkit-sphere-final.jpg`.

## Cinematic contact footer — 7 October 2026

The shared footer now follows the user-supplied CinematicFooter prompt, adapted to contact Jascon. It includes the curtain reveal, diagonal looping marquee, aurora/grid backdrop, large gradient heading and JASCON lettering, magnetic glass buttons, the verified email and LinkedIn profile, email-copy feedback, and a back-to-top action.

Browser checks covered Home at 1440 × 1000, 390 × 844, and 320 × 568. The tall layouts use the fixed clipped reveal; the short layout uses normal document flow. Neither checked layout has horizontal page overflow. Both contact actions remain reachable on the smallest layout. Copy email displays its confirmation, and back-to-top updates the anchor and returns to the main section. An About round trip confirmed the ivory theme and visible heading after the route-height change. Proof is saved in `docs/previews/cinematic-footer-desktop.jpg` and `docs/previews/cinematic-footer-mobile.jpg`.

All 29 tests in 11 files pass, including four new checks for verified contact destinations, successful copying and confirmation reset, clipboard-denied fallback, and keyboard-triggered curtain visibility. The production build and TypeScript checks pass. The existing Vite chunk-size warning remains; no new performance benchmark was run.

Lint could not complete on this date because Windows Application Control blocked the installed Oxlint native binding (`@oxlint/binding-win32-x64-msvc`). Running outside the sandbox encountered the same operating-system policy. The policy and dependencies were left unchanged; this is a tooling limitation, not a passing lint result.

## Rumahweb deployment package — 7 October 2026

Prepared `deployment/jascon.my.id-2026-10-07.zip` for the root of the user's dedicated `jascon.my.id` document root. The ZIP contains 84 website files directly at its root, including `.htaccess`, the original GLB, all local media, `robots.txt`, and ten sitemap URLs. It is approximately 9.69 MB compressed and 10.77 MB unpacked. Source, dependencies, credentials, and backup folders are not included.

The packager verified every ZIP member against the production build/generated contents, checked archive integrity, and validated the local JS/CSS entry references. A SHA-256 checksum and per-file manifest accompany the archive. The production build and all 29 tests pass; the existing bundle-size warning remains. Apache rules explicitly handle `/projects` before the existing media directory, preserve media responses, and leave missing static assets as 404.

No hosting account, DNS, domain document root, or other hosted website was changed. Apache/Docker was unavailable for a local server check, so the rewrite/header behavior and SSL must be verified on Rumahweb after upload. Installation and recovery steps are documented in `docs/deployment-rumahweb.md`, with a copy beside the ZIP.

## What I Bring glow cards — 7 October 2026

Replaced Home's practice-card wrapper with the user-supplied GlowCard design. The Web, AI, and Security content remains grounded in the portfolio, with translucent blue, purple, and green surfaces, matching icons, colored/white pointer-driven edges, and a soft halo. CSS is scoped; no new runtime dependency is required. About retains its original SpotlightCard.

Browser checks covered a 1280 × 720 desktop, a 750 × 855 default window, and 390 × 844 / 320 × 568 phone layouts. Actual pointer input produced the expected moving border gradients on the hovered and adjacent cards. Phone layouts stack the cards; text and tags fit inside their content areas, the page has no horizontal overflow, and vertical scrolling over the cards remains available. Fuji and Alpine wallpaper selections retained readable copy. The tested selection was restored afterward. Desktop and phone proof are saved in `docs/previews/what-i-bring-glow.jpg` and `docs/previews/what-i-bring-glow-mobile.jpg`.

All 31 tests in 12 files pass. Two added interaction checks cover batched pointer updates, scroll alignment, cancellation and listener cleanup, touch input, and live motion-preference changes. TypeScript, lint, and the production build pass on this run; the earlier lint-tool limitation did not recur. The existing Vite bundle-size warning remains. The Rumahweb ZIP is refreshed from this production build and checked by the existing packager.

## Scene picker transparency — 7 October 2026

The user requested a more transparent background for the **Set the Scene** panel. Its dark fill is reduced from approximately 73% to 20%, backdrop blur from 18 px to 6 px, and decorative grain from 22% to 6%. A subtle text shadow preserves readable titles and controls. The change is scoped to the Home scene picker.

The local browser confirmed the 20% background, 6 px blur, and 6% grain, with the wallpaper visible through the panel. Proof is saved in `docs/previews/home-scene-picker-transparent.jpg`. The production build and TypeScript checks pass; the Rumahweb deployment ZIP is refreshed and verified. No additional tests were added for this visual-only adjustment.

## Personal portrait card redesign — 7 October 2026

The user's hero-avatar screenshot is replaced with a lighter glass portrait card: arched backdrop, soft lavender light, a subtle floor ellipse, a two-line Jascon Kembuan identity panel, and a real arrow link to About. The existing pause/resume control moves to the header. The original GLB, camera configuration, rig motion, lazy loading, retry, resource cleanup, and reduced-motion behavior remain in place.

Browser checks covered the 750 × 855 default window, 1280 × 800 desktop, and 390 × 844 / 320 × 568 phone layouts. Actual pointer input changed the avatar's horizontal look from -0.389 to 0.317. Pause/resume updates its state and feedback correctly; the profile arrow opened `/about`, and returning Home reloaded the portrait. On the smallest layout, the header and identity content fit their containers without horizontal page overflow. Temporary viewport overrides were reset afterward.

All 31 existing tests in 12 files pass, including the updated hero tests using the router and checking the new profile destination. Lint and the production build (including TypeScript) pass. The existing Vite chunk-size warning remains. Proof is saved in `docs/previews/hero-portrait-redesign-desktop.jpg` and `docs/previews/hero-portrait-redesign-mobile.jpg`. The Rumahweb deployment ZIP is refreshed and checked with the existing packager.

## About, Work, and shared wallpaper — 7 October 2026

About now has exactly one section within its main content: introduction, personal GLB portrait, current CISO internship, Informatics Engineering education, verified LLM security credential, and data-derived project/tool counts. Its actions lead to Work and contact. The About portrait's arrow points to contact instead of linking back to the same page. The former multi-section biography is preserved in the ignored recovery directory.

Work follows Home's dark translucent glass styling with lavender accents. Landscape cards show the four original website logos and homepage screenshots, readable descriptions, technology tags, and case-study links. The remaining three projects retain labeled concept illustrations. All four logos and all seven preview images loaded in the browser. Academic and Freelance filters returned two and four matching projects, respectively; Internship led to the existing confidential public overview.

One persistent backdrop now serves every route. Actual Home controls selected City after the rain; About, Work, Circular Waste details, and CISO details displayed the same wallpaper. Reloading the Circular Waste case study retained that selection. The CISO notice uses light text over a dark glass surface. Fuji at dusk was restored after testing. Home's picker now explains that the selection follows the visitor across pages; shared header/footer colors match the Home theme.

Browser checks covered 1280 px desktop views, the default app window, and 390 × 844 / 320 × 568 phone layouts. About retained one section, the mobile menu closed on navigation, filters wrapped on the smallest screen, profile fact cells fit their content, and no horizontal page overflow appeared. Temporary viewport overrides were reset. Desktop proofs are `docs/previews/about-studio-desktop.jpg` and `docs/previews/work-studio-desktop.jpg`; phone proof is `docs/previews/work-studio-mobile.jpg`.

All 35 tests in 14 files pass, including new cross-route wallpaper persistence, direct visits to inner/missing pages, the single-section profile, and its contact destination. Lint, TypeScript, and the production build pass. The existing Vite bundle-size warning remains. The verified Rumahweb ZIP is refreshed: 84 files, approximately 9.69 MB compressed / 10.78 MB unpacked, SHA-256 `9849b4b253a7e87c96052e9feecef08799da04fd7fd7d64d2f469b86b3a0448e`. No hosting upload was performed.

## Live domain check and archive permission correction — 7 October 2026

After the user extracted the package in cPanel, the live browser showed `https://jascon.my.id/` returning **403 Forbidden** from LiteSpeed. Independent HTTPS checks also returned 403 for `index.html`, About, robots, sitemap, and both known bundled entry assets. `/projects` redirected to a directory listing rather than the React catalogue. The live portfolio is therefore not yet usable; cPanel permissions, document root, and rewrite handling still require checking.

The archive audit found all 84 original entries stored with mode `0600`, inherited from Python's `writestr` defaults. That metadata can make public files unreadable to a hosting web server; server-side extraction permissions have not been inspected, so it is a likely cause rather than a confirmed diagnosis of the cPanel configuration. The earlier packager verified content but missed hosting permission metadata.

The packager now explicitly writes Unix regular files with `0644` and ten directory entries with `0755`. Validation checks every member's type, platform, and permissions as well as its contents, entry references, sitemap, and CRC integrity. A separate archive audit passes. The prior ZIP/manifest/checksum are preserved in `backups/deployment-before-permission-fix`. The corrected package's SHA-256 is `022eba53e5be0d342e6169b48ee60b17ab1e6c0b31de9bdf0e75f7f49a99025f`.

The deployment guide now includes permission checks and 403 troubleshooting scoped to the dedicated portfolio document root. No application source or server configuration was changed during this check. The corrected ZIP has not been uploaded, and restoration of the live site is not claimed.
