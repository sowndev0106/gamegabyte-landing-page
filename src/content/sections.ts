/**
 * The page's eleven sections in document order. Section numbering shows up in
 * the rail, the mobile menu and every section heading — this array is the only
 * place it is written down, so reordering the page is a one-line edit.
 */
export const SECTIONS = [
  { id: 'home', index: '01', label: 'Command', eyebrow: 'Game growth systems' },
  { id: 'reel', index: '02', label: 'Transmission', eyebrow: 'Visual transmission' },
  { id: 'telemetry', index: '03', label: 'Telemetry', eyebrow: 'Studio telemetry' },
  { id: 'services', index: '04', label: 'Services', eyebrow: 'Systems matrix' },
  { id: 'process', index: '05', label: 'Process', eyebrow: 'Mission sequence' },
  { id: 'about', index: '06', label: 'Advantages', eyebrow: 'Operational advantages' },
  { id: 'portfolio', index: '07', label: 'Archive', eyebrow: 'Archive / 03 files' },
  { id: 'testimonials', index: '08', label: 'Logs', eyebrow: 'Communication logs' },
  { id: 'academy', index: '09', label: 'Academy', eyebrow: 'Training subsystem / external node' },
  { id: 'faq', index: '10', label: 'Diagnostics', eyebrow: 'System diagnostics' },
  { id: 'contact', index: '11', label: 'Channel', eyebrow: 'Open channel' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
export type SectionMeta = (typeof SECTIONS)[number]

export function sectionById(id: SectionId): SectionMeta {
  const found = SECTIONS.find((section) => section.id === id)
  if (!found) throw new Error(`Unknown section id: ${id}`)
  return found
}

/**
 * The five groups the topbar prints, in document order.
 *
 * Eleven sections do not fit a horizontal bar at the mono nav step — the wide
 * tracking that makes a two-word label read as an instrument is exactly what
 * makes eleven of them overflow. So the bar carries groups and the rail keeps
 * the full eleven; the two are different resolutions of one list, not two
 * different navigations.
 *
 * `home` and `contact` are deliberately absent: the logo is the way back to
 * one, and the CTA is the way to the last. A group links to its first section.
 */
export const NAV_GROUPS = [
  { id: 'work', label: 'Work', sections: ['reel', 'portfolio'] },
  { id: 'services', label: 'Services', sections: ['services', 'process'] },
  { id: 'studio', label: 'Studio', sections: ['telemetry', 'about', 'testimonials'] },
  { id: 'academy', label: 'Academy', sections: ['academy'] },
  { id: 'faq', label: 'FAQ', sections: ['faq'] },
] as const satisfies readonly {
  id: string
  label: string
  // Typed as SectionId so a renamed or mistyped section fails the build rather
  // than shipping a nav link that scrolls nowhere.
  sections: readonly SectionId[]
}[]

/**
 * Which group owns the section currently being read, or `undefined` while the
 * viewport belongs to `home` or `contact` — neither has a group, so the bar
 * shows no prompt rather than picking an arbitrary one.
 */
export function activeGroupId(section: string): string | undefined {
  return NAV_GROUPS.find((group) => (group.sections as readonly string[]).includes(section))?.id
}

/**
 * The section being read, written as a shell path for the topbar prompt. The
 * page is the working directory and scrolling is `cd` — so the readout reports
 * a real position instead of restating a fixed claim.
 *
 *   home         → `~`
 *   reel         → `~/work/reel`
 *   process      → `~/services/process`
 *   services     → `~/services`        (the section IS the group root)
 *   academy      → `~/academy`         (likewise)
 *   contact      → `~/contact`         (belongs to no group)
 *
 * Section ids are already lowercase and hyphenated, so they are used verbatim
 * rather than slugged from labels — the path can never drift from the anchor it
 * describes.
 */
export function sectionPath(section: string): string {
  if (!section || section === 'home') return '~'

  const group = NAV_GROUPS.find((entry) => (entry.sections as readonly string[]).includes(section))
  if (!group) return `~/${section}`
  // A group whose name is also a section would otherwise repeat itself
  // (`~/services/services`), which reads as a bug rather than a root.
  if (group.id === section) return `~/${group.id}`
  return `~/${group.id}/${section}`
}
