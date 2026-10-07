# Redesign component sources

Implemented on 6 October 2026 for Jascon Interactive Studio.

## User-provided prompt

The pasted integration prompt supplies [Spline Scene by Serafim](https://21st.dev/@serafimcloud/components/splite), Card primitives, and an ibelick Spotlight. Their supplied implementation has been adapted to this Vite/React project with `@/` aliases, `cn`, `motion/react`, proper event cleanup, lazy loading, and an error boundary. Spline Scene was listed as MIT in the inspected bookmark metadata. Card retains the supplied primitive structure.

The prompt's example scene URL was not used as the production hero. Initially, the user had no avatar source and the hero displayed an original local monogram sculpture. The later supplied GLB now replaces it using the locally authored viewer described below.

## One additional bookmark retrieved

[Coverflow Carousel by Ruixen UI](https://21st.dev/@ruixen.ui/components/coverflow-carousel), bookmark/demo ID 23997, retrieved through the official 21st MCP `get_component` tool. The source and returned metadata are preserved in `21st-coverflow-source.json`. The registry lists the MIT license.

Local changes add project selection callbacks, synchronized case-study links, larger touch controls, keyboard navigation, reduced-motion snapping, cleanup, and click-versus-drag handling. The demo stock images and music copy are replaced with original local project illustrations and verified portfolio content.

The retrieval response reported one of two free retrievals remaining for the day. No other bookmarked source was retrieved for this redesign.

## Original implementation

The responsive navigation, glass-style buttons, project caption and cards, career Journey, Spotlight Card wrapper, Text Rewind, about layout, contact composition, all seven SVG covers, and overall visual system were authored locally. Names and visual inspiration do not mean other bookmarked source implementations were copied.

## Home wallpaper update

The user supplied the Crafter UI **Hero Carousel** integration prompt as an attachment. The adapted component is `src/components/ui/hero-carousel.tsx`. No additional 21st MCP retrieval or prompt generation was used for this update.

Changes include a compact landscape filmstrip, a Home-wide fixed backdrop, local responsive images, persisted selection, source attribution, explicit previous/next controls, and reduced-motion transitions. Normal vertical wheel input scrolls the page; horizontal input browses scenes. `overflow: clip` prevents focused filmstrip frames from internally scrolling the stage and cutting off its headline or controls.

The wallpapers are the five exact Wallhaven selections supplied by the user: [q68jd7](https://wallhaven.cc/w/q68jd7), [725oxv](https://wallhaven.cc/w/725oxv), [zpv8ry](https://wallhaven.cc/w/zpv8ry), [5yp7j8](https://wallhaven.cc/w/5yp7j8), and [lygzqq](https://wallhaven.cc/w/lygzqq). They were retrieved using the official Wallhaven API. The uploader and source metadata are preserved in `home-wallpaper-sources.json`; no license or original authorship is inferred from uploader names. Images are resized and compressed without altering their visual content. The attribution link follows the selected scene.

`scripts/import-hero-carousel.mjs` preserves the upstream prompt in the ignored backup folder; rerunning it does not overwrite the adapted component.

## User-supplied GLB avatar

The user supplied `C:/Users/jacso/Downloads/avatar.glb` to replace the hero sculpture and requested mouse-following head or body movement. The asset is copied unchanged into `public/models/avatar.glb`. The viewer and rig interaction are original local implementations in `AvatarScene.tsx`, `avatar-scene.ts`, and `avatar-motion.ts`; they do not consume 21st quota or use an external avatar service.

[Three.js GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) and its bundled Meshopt decoder load the embedded mesh and textures. The implementation preserves the rig's rest pose, converts screen rotations into bone-local axes, eases cursor movement, and supports pause, retry, reduced motion, visibility suspension, and resource disposal. The source GLB's generator metadata is `gltfpack 1.2`; no claim of model authorship is inferred from that metadata.

Keep upstream notices when modifying or redistributing imported components. Dependency licenses remain in their respective packages.

## User-supplied toolkit sphere

The later `SphereImageGrid` / `img-sphere.tsx` integration prompt was supplied as a text attachment by the user. Its author and license are not specified in the attachment; no MIT license is inferred. The original prompt is preserved in the ignored `backups/sphere-prompt/Pasted text.txt` recovery copy. No 21st MCP retrieval or prompt generation was used.

`src/components/ui/img-sphere.tsx` adapts its Fibonacci distribution, projected X/Y rotation, drag, momentum, and detail view to actual technology marks instead of people. Changes include deterministic placement, per-frame DOM transforms, responsive sizing, native pointer capture, preserved touch scrolling, off-screen/hidden-tab suspension, continuous automatic rotation, keyboard rotation, an accessible complete list, and a native modal dialog with Escape and focus restoration. `ToolkitSphere.tsx` adds the local category filters, reduced-motion preference, and transparent Home styling. The user subsequently requested removal of the play/pause control.

The toolkit entries are based on existing project and skill data, plus the five cybersecurity tools explicitly named by the user. Generic protocols/algorithms and unverified standalone marks use clearly documented local text badges. The remaining marks come from [Simple Icons](https://github.com/simple-icons/simple-icons), [Devicon's Java asset](https://github.com/devicons/devicon/blob/master/icons/java/java-original.svg), and the relevant official sites. Exact asset sources and transformations are recorded in `tool-logo-sources.json`; public availability is not treated as a license grant or evidence of tool proficiency.

## User-supplied cinematic contact footer

The `CinematicFooter` / `motion-footer.tsx` prompt was supplied by the user on 7 October 2026. Its author and license are not specified; no license is inferred. The original attachment is preserved in the ignored `backups/footer-prompt/Pasted text.txt`. No additional 21st MCP retrieval or prompt generation was used.

`src/components/ui/motion-footer.tsx` adapts the curtain reveal, diagonal marquee, aurora, giant background lettering, GSAP entrances, and magnetic glass buttons to Jascon's existing public email and LinkedIn profile. Sample app-store links, placeholder policies, and upstream example branding are replaced with contact actions, a visible email address, clipboard feedback, and a back-to-top link. Styling uses the existing locally bundled Manrope font and portfolio theme in `src/MotionFooter.css`.

The adaptation adds keyboard-triggered curtain visibility, bounded mouse movement, reduced-motion support, normal document flow for short windows, route/layout refreshes, and cleanup for observers, listeners, timers, and GSAP animations. Ambient animations suspend while the footer is off screen or the document is hidden.
