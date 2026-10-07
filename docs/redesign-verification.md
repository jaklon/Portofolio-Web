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
