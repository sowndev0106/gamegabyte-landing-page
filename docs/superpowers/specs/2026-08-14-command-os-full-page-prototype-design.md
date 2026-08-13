# Command OS Full-Page Prototype Design

**Goal:** Create a standalone full-page Gamegabyte prototype that preserves all production content and core interactions while redesigning every section in the native visual language of Cinematic Tech HUD Variant B.

## Scope

- Build a new prototype page without modifying production React files.
- Preserve the existing Cinematic Tech HUD A/B/C prototype and Stats A–F prototype.
- Include every current and parked content section: Header, Hero, Showreel, Stats, Services, Work Process, Why Choose Us, Portfolio, Case Study, Testimonials, Academy, FAQ, Contact, and Footer.
- Reuse production copy and repository assets wherever available.
- Provide one local command that opens the prototype.
- Support desktop and mobile layouts with no horizontal overflow.

## Direction: B-Native Command OS

The prototype treats Gamegabyte as a live studio command system rather than applying a superficial dark theme. Variant B's sticky vertical rail, top status bar, technical grids, lime signal nodes, monospaced metadata, asymmetric archive layouts, orbital diagrams, and dense telemetry panels define the page architecture.

The tone is precise, confident, cinematic, and operational. Motion explains active signals and transitions; it does not decorate every element. White display typography carries hierarchy, lime marks live data and actions, violet creates depth, and hairline borders expose the underlying system.

## Page Architecture

### Global Shell

- A sticky vertical rail contains the Gamegabyte mark, compact section navigation, and network status.
- A top status bar reports the studio network state and provides the primary `Open channel` action.
- Desktop content begins after the rail; mobile replaces the rail with a compact sticky command bar and menu.
- A shared technical grid, section index system, mono metadata, and live-status vocabulary connect every section.

### Hero — Launch Command

- Use the active portal-arena hero artwork with a controlled dark gradient.
- Preserve the production headline, supporting copy, CTA intent, and credentials.
- Pair the headline with a telemetry dashboard showing campaign readiness, studio focus, shipped projects, and active system nodes.
- Add a horizontal ticker introducing the studio's capabilities.

### Showreel — Visual Transmission

- Present the production video as a monitored transmission screen rather than a conventional media block.
- Preserve play, pause, mute, loading, and reduced-motion behavior.
- Add signal framing, timecode treatment, and a minimal transmission-status panel without obscuring the video.

### Stats — Studio Telemetry

- Preserve all four production metrics.
- Recompose them as a command telemetry system consistent with Variant B, using one dominant reading and three supporting system readings.
- Values remain readable without animation; count-up is optional in the prototype.

### Services — Systems Matrix

- Render the six services as an input/output capability matrix.
- Preserve service titles and descriptions.
- Use alternating system-key cells, technical dividers, and restrained pointer response.

### Work Process — Mission Sequence

- Use `#b-process` as the direct visual reference.
- Place a sticky orbital/radar system on the left and the four production process steps on a vertical signal path on the right.
- Orbit and signal-node motion stop under reduced-motion preferences.

### Why Choose Us — Operational Advantages

- Render the four reasons as operational nodes rather than generic cards.
- Preserve each tag, title, body, and pixel sprite.
- Tie nodes together with a shared status line and small diagnostic readings.

### Portfolio — Field Operations Archive

- Preserve the three production projects and their images.
- Use Variant B's asymmetric archive: one dominant operation and two supporting files.
- Maintain clear hover and focus states and preserve project destinations.

### Case Study — Mission Dossier

- Restore the parked Beyond The Keep case study in the prototype.
- Present its screens as a dossier: mission summary, client metadata, primary screen, and scrollable supporting interface records.
- Reuse every case-study image currently declared in production content.

### Testimonials — Communication Logs

- Restore parked testimonials as incoming studio transmissions.
- Preserve every quote and author.
- Use readable log panels with transmission IDs and no auto-rotating carousel.

### Academy — Training Terminal

- Restore the parked Academy section.
- Present the course as a separate training subsystem with title, body, feature list, image, and external destination preserved.
- The external CTA opens in a new tab with safe link attributes.

### FAQ — System Diagnostics

- Preserve all production questions and answers.
- Use an accessible accordion with real buttons, `aria-expanded`, keyboard support, and one readable answer panel per diagnostic item.
- Multiple items may remain open; opening one does not force another closed.

### Contact — Brief the Studio

- Preserve the production heading, copy, form fields, and response-status card.
- Present the form as a transmission console.
- Prototype submission validates required fields, prevents navigation, and exposes a clear local success state; it does not send external data or open a mail client.

### Footer — Network Status

- Preserve production footer groups, tagline, social labels, and legal labels.
- End with a compact network-status strip showing prototype-only state.

## Interaction Model

- Navigation links scroll to the matching section and update the visible active node.
- Mobile navigation opens and closes from the sticky command bar, closes after selection, and can be dismissed with Escape.
- Showreel controls remain functional.
- FAQ uses accessible disclosure buttons.
- Contact form uses in-memory state only and displays a successful local transmission message.
- Hover effects never carry essential information and all controls have visible keyboard focus.
- Reveal, orbit, ticker, scan, and signal motion are disabled or resolved to final states under `prefers-reduced-motion: reduce`.

## Prototype Isolation

- The prototype lives under a clearly named `prototypes/` directory on its own retained branch and worktree.
- No production component, content file, styling file, or application order is modified.
- Existing prototype branches and worktrees remain intact.
- The page is visibly marked as prototype-only.

## Acceptance Criteria

- One standalone route renders all thirteen content sections plus Header and Footer.
- Every current and parked production section is represented with production content and repository assets.
- The result reads as a native Variant B command system, not a reskin of the production layout.
- Navigation, mobile menu, video controls, FAQ, contact success state, and external Academy CTA function as specified.
- Desktop at `1440x1000` and mobile at `390x844` have no horizontal overflow or clipped essential content.
- Reduced-motion mode has no continuously running decorative animation.
- Browser console contains no errors during the primary interaction path.
- Production source and all existing prototypes remain unchanged.
