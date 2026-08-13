# Cinematic Tech HUD UI Design

## Objective

Evolve the current Gamegabyte landing page into a more creative, technology-led experience without losing its premium dark gaming identity. The redesign must also correct the current visual monotony, excessive page length, weak project emphasis, dense mobile composition, and overuse of glow effects.

## Design principles

1. Motion communicates hierarchy and progress; it is not decoration applied everywhere.
2. Cinematic imagery provides emotional impact while HUD elements provide technical character.
3. Every section must belong to one of three visual modes so adjacent sections do not repeat the same composition.
4. Lime remains the action color. Purple remains atmospheric. White remains the primary reading color.
5. Animation must remain calm, performant, and fully compatible with `prefers-reduced-motion`.

## Visual system

### Modes

- **Cinematic image:** Large game artwork, controlled gradients, deep spatial lighting. Use for Hero and Portfolio.
- **Grid/data:** Technical grid, indexes, signal lines, metrics, and restrained monospaced labels. Use for Stats, Services, and Process.
- **Neon panel:** A brighter lime or purple surface that interrupts the dark page rhythm. Use for Testimonials or Academy, but not both at full intensity.

### Color and effects

- Base: ink black `#030213`.
- Primary action: acid lime `#b6e802`.
- Atmosphere: brand purple `#601feb` and ultraviolet highlights.
- Replace repeated radial glows with local, purpose-driven light sources.
- Use subtle monochrome noise and a low-opacity grid for depth; avoid continuous glitch effects.
- Preserve WCAG-readable contrast for body copy and interactive controls.

### Typography

- Keep Schibsted Grotesk for display text and Roboto for body text.
- Retain monospaced HUD labels, but reduce mobile letter spacing to approximately `0.18em–0.22em`.
- Keep major desktop headings bold and uppercase; control mobile wrapping so headings do not dominate multiple screens.
- Raise secondary body text from `white/70` where needed to prevent low-contrast grey-on-black passages.

## Motion system

### Ambient motion

- The hero portal receives a slow opacity and scale pulse.
- A small number of particles drift around the portal, restricted to the image side of the composition.
- Grid backgrounds may drift by a few pixels over long durations.
- Ambient animations use long cycles and never flash or loop aggressively.

### Scroll motion

- Section headers reveal in sequence: index and eyebrow, rule, title, then description.
- Cards reveal with short staggered movement and opacity; travel distance stays below 24px.
- The Process signal line fills as its steps enter the viewport.
- Portfolio artwork reveals through a directional clip rather than a generic fade.

### Interaction motion

- Service and project cards receive a restrained pointer-responsive highlight, 2–3% image scale, animated corner marks, and directional arrows.
- Buttons retain the existing small lift/tap response.
- No custom cursor, persistent glitch, large 3D tilt, or scroll hijacking.

### Accessibility and performance

- `prefers-reduced-motion` shows final states immediately and disables ambient movement.
- Transform and opacity are the default animated properties.
- Pointer-follow effects are disabled on touch devices.
- Decorative canvas or particle layers must not block interaction and must be `aria-hidden`.

## Information architecture

Use the following visual order:

1. Hero
2. Showreel
3. Client trust strip and Stats
4. Project Showcase
5. Services with Technology integrated
6. Process
7. Why Gamegabyte
8. Testimonials
9. Academy
10. FAQ
11. Contact and Footer

Moving Project Showcase upward places the strongest proof before detailed service explanations. Integrating Technology into Services removes a generic standalone section and shortens the page.

## Section designs

### Header

- Preserve the transparent-to-blurred fixed header behavior.
- Increase desktop navigation legibility slightly and reduce excessive tracking.
- Use a longer animated lime underline for the active section.
- Keep the mobile sheet visually solid and add focus containment during implementation.

### Hero

- Keep the portal-arena artwork.
- Replace the flat `bg-ink/85` overlay with a multi-stop gradient: darkest behind centered copy, lighter toward the right-side portal and lower foreground.
- Add a portal pulse and sparse particles that stay away from the copy area.
- Keep the centered headline and two CTA buttons.
- Compress mobile credentials into a two-column layout with the final item spanning both columns, reducing hero height.
- Keep all essential copy and CTA controls visible without depending on animation.

### Showreel and trust

- Retain the cinematic player and corner markers.
- Add a subtle scanning highlight that runs once when the player enters view.
- Keep the logo strip quieter than the video and avoid repeated glow effects.

### Stats

- Keep count-up behavior and grid-based cards.
- Introduce a single animated data trace behind the four metrics.
- Reduce card height and vertical section padding.
- Do not add charts that imply unavailable data.

### Project Showcase

- Move directly after Stats.
- Feature the first project as a wide lead story with larger art, title, discipline, and a short result-oriented summary.
- Place the remaining two projects in a two-column row.
- Remove category filters while only three projects exist; restore filters when the collection is large enough to produce meaningful groups.
- Use clip-path image reveal, restrained hover zoom, animated corner markers, and a directional arrow.

### Services and Technology

- Merge the standalone Technology section into Services.
- Keep six service cards but reduce body copy and add a distinct line icon or technical symbol per service.
- Add a compact technology/tool row within the section instead of four generic technology cards.
- Use animated borders and pointer highlights only on devices with fine pointers.

### Process

- Turn the four steps into a connected signal timeline.
- On desktop, use a horizontal signal line that fills from left to right.
- On mobile, use a vertical line so the reading order remains natural.
- Activate one step at a time as the user scrolls without hiding inactive content.

### Why Gamegabyte

- Keep the editorial list structure to provide a calm reading section after denser cards.
- Strengthen row numbering and add a small technical status marker per benefit.
- Avoid additional glow or large background imagery.

### Testimonials

- Use this as the primary visual break with a restrained purple surface or large soft ultraviolet field.
- Keep the quote readable and limit decorative elements.
- The layout must support one testimonial now and expand cleanly to multiple testimonials later.

### Academy

- Keep Academy compact rather than presenting it as a full product experience.
- Use a brighter lime-edged terminal panel with a small curriculum/data motif.
- Avoid competing with the stronger Testimonial visual break.

### FAQ

- Preserve the accessible accordion.
- Add only a subtle line-fill interaction and clearer active-row contrast.
- Reduce surrounding vertical whitespace.

### Contact and Footer

- Keep the form visually dominant and use a controlled lime atmospheric glow behind it.
- Add a small response-time/status block to balance the empty right side on desktop.
- Preserve strong field labels and focus treatment.
- Keep the Footer visually quiet so it resolves the page rather than introducing another effect layer.

## Responsive behavior

- Validate at 390px, 768px, 1024px, and 1440px widths.
- No horizontal page overflow or clipped headings.
- Disable pointer-follow effects below the fine-pointer breakpoint.
- Convert horizontal timelines and multi-column metrics into natural vertical or compact grid layouts.
- Fixed header must not obscure anchor targets or section controls.

## Scope boundaries

- This redesign changes UI composition, motion, and visual presentation.
- It does not create real case-study pages, a contact backend, legal pages, or social destinations.
- Placeholder destinations remain a separate product-content task, although the UI must not visually imply functionality that does not exist.
- No new heavy animation framework is required; continue using Motion and CSS.

## Verification

- Run lint and production build.
- Capture full-page desktop and mobile screenshots after all lazy content has entered the viewport.
- Capture focused screenshots of Hero, Project Showcase, Services, Process, Testimonials, and Contact.
- Test keyboard navigation, reduced-motion rendering, mobile menu, FAQ interaction, and filter removal.
- Confirm no console errors, broken images, clipped text, or horizontal overflow.

