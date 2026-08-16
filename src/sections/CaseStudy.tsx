import { content } from '../content/content'
import { Reveal } from '../components/motion/Reveal'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionSplit } from '../components/ui/SectionSplit'
import { Panel } from '../components/ui/Panel'

/**
 * One shipped title read as a dossier: a meta panel, the primary record held
 * open, then the full archive on a horizontal rail.
 *
 * Every screen here is a captured interface, so all of them are framed 16:9 to
 * match the source art. A fixed height instead of a ratio crops the edges of
 * the very work the section exists to show.
 */
export function CaseStudy() {
  const study = content.caseStudy
  // The rail carries every record; the feature above simply holds the first
  // one open, the way a dossier lies open at its primary page.
  const [primary] = study.screens
  const recordCount = String(study.screens.length).padStart(2, '0')

  return (
    <Section id="case-study" grid>
      <Container>
        <SectionSplit id="case-study" title={study.title} description={study.intro} >

          <Reveal>
            <div className="grid gap-7.5 lg:grid-cols-[0.65fr_1.35fr]">
              <Panel className="flex flex-col p-7">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                  Client / {study.client}
                </span>
                <strong className="mt-5 font-display text-[28px] leading-none font-bold text-white">
                  {study.systemTitle}
                </strong>
                <p className="mt-4 leading-relaxed text-white/70">{study.systemBody}</p>
                <span className="mt-auto flex items-center gap-2.5 pt-8 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                  <span aria-hidden="true" className="command-status-dot h-1.5 w-1.5 rounded-full bg-accent" />
                  {recordCount} records
                </span>
              </Panel>

              <figure data-dossier-feature className="relative aspect-video overflow-hidden border border-white/11">
                <img src={primary.src} alt={primary.label} loading="lazy" className="h-full w-full object-cover" />
                <figcaption className="absolute right-4.5 bottom-4.5 bg-accent px-2.75 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ink">
                  {study.recordLabel}
                </figcaption>
              </figure>
            </div>

            {/* The one place horizontal overflow is intended. */}
            <div className="dossier-rail mt-3.5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-4.5">
              {study.screens.map((screen, i) => (
                <figure
                  key={screen.src}
                  data-dossier-screen
                  className="w-[min(500px,78vw)] flex-none snap-start border border-white/11 bg-white/1.5"
                >
                  <img
                    src={screen.src}
                    alt={screen.label}
                    loading="lazy"
                    className="block aspect-video w-full object-cover"
                  />
                  <figcaption className="p-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                    {String(i + 1).padStart(2, '0')} / {screen.label}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">{study.railNote} →</p>
          </Reveal>
        </SectionSplit>
      </Container>
    </Section>
  )
}
