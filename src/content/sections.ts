/**
 * The page's twelve sections in document order. Section numbering shows up in
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
  { id: 'case-study', index: '08', label: 'Dossier', eyebrow: 'Mission dossier / Seedify' },
  { id: 'testimonials', index: '09', label: 'Logs', eyebrow: 'Communication logs' },
  { id: 'academy', index: '10', label: 'Academy', eyebrow: 'Training subsystem / external node' },
  { id: 'faq', index: '11', label: 'Diagnostics', eyebrow: 'System diagnostics' },
  { id: 'contact', index: '12', label: 'Channel', eyebrow: 'Open channel' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']
export type SectionMeta = (typeof SECTIONS)[number]

export function sectionById(id: SectionId): SectionMeta {
  const found = SECTIONS.find((section) => section.id === id)
  if (!found) throw new Error(`Unknown section id: ${id}`)
  return found
}
