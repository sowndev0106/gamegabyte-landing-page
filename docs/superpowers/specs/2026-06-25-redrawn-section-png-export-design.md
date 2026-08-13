# Redrawn Section PNG Export Design

**Goal:** Export sharp PNG sections from the rebuilt Gamegabyte React page using source assets, SVG logo, local fonts, and browser rendering.

**Approach:** Use the existing Vite app as the source of truth. Add a Playwright export script that opens a local URL, waits for fonts and images, computes bounding boxes for semantic section groups, and writes PNG files to `design/d1cfc480-redrawn-sections`.

**Outputs:**
- `01-hero-showreel-stats.png`
- `02-services.png`
- `03-process.png`
- `04-growth-partner-selected-projects.png`
- `05-testimonials-academy.png`
- `06-faq.png`
- `07-contact.png`
- `08-footer.png`

**Constraints:**
- Do not overwrite the original screenshot or earlier manual crops.
- Keep the export workflow reusable.
- Use the app's real DOM, SVG logo, local fonts, and high-resolution assets.
- Verify generated PNG files exist, are non-empty, and have valid dimensions.
