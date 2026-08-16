import { CommandShell } from '../components/shell/CommandShell'
import { Container } from '../components/ui/Container'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'
import { Footer } from '../sections/Footer'
import { WorkBlocks } from '../components/work/WorkBlocks'
import { workIndex, workPath, type WorkDetail } from '../content/work/types'

const ENGAGEMENT_LABEL: Record<string, string> = {
  client: 'Client work',
  concept: 'Self-initiated concept',
  challenge: 'Community challenge',
}

export function WorkDetailPage({ project }: { project: WorkDetail }) {
  const position = workIndex.findIndex((item) => item.slug === project.slug)
  const next = workIndex[(position + 1) % workIndex.length]

  return (
    <CommandShell base="/" footer={<Footer />}>
      <article>
        <header className="relative overflow-hidden bg-ink pt-32 pb-14 md:pt-40 md:pb-20">
          <div
            aria-hidden="true"
            className="hud-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <Container className="relative z-10">
            <a
              href="/work/"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent hover:text-accent-bright"
            >
              <span aria-hidden="true">&lt;</span> Archive
            </a>

            <h1 className="mt-6 max-w-[20ch] font-display text-[38px] leading-[0.98] font-bold uppercase text-white md:text-[64px]">
              {project.title}
            </h1>

            {project.description && (
              <p className="mt-7 max-w-[68ch] text-[16px] leading-relaxed text-white/70">
                {project.description}
              </p>
            )}

            {/*
              Metadata as a definition list, not a row of pills: every one of
              these is a labelled value, and a pill row makes the reader guess
              which label each value belongs to.
            */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/11 pt-8 md:max-w-3xl md:grid-cols-4">
              <Fact label="Year" value={project.publishedOn.slice(0, 4)} />
              <Fact label="Client" value={project.client} />
              <Fact label="Engagement" value={ENGAGEMENT_LABEL[project.engagement] ?? ''} />
              <Fact label="Tools" value={project.tools.join(', ')} />
            </dl>

            {project.tags.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-white/11 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/48"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </header>

        <div className="bg-ink pb-20 md:pb-28">
          <Container>
            <WorkBlocks blocks={project.blocks} />
          </Container>
        </div>

        <Container className="pb-24 md:pb-32">
          <div className="flex flex-col gap-6 border-t border-white/11 pt-10 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
                Next file
              </span>
              <a
                href={workPath(next.slug)}
                className="group mt-2.5 flex items-center gap-2.5 font-display text-[26px] leading-none font-bold text-white hover:text-accent md:text-[34px]"
              >
                {next.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>

            {/*
              Credit and the original posting. The clone is a mirror, so the
              page it mirrors stays one click away.
            */}
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 self-start font-mono text-[9px] uppercase tracking-[0.16em] text-white/48 hover:text-white md:self-auto"
            >
              {project.author.name} on Behance
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </Container>
      </article>
    </CommandShell>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">{label}</dt>
      {/* An em dash, never a blank cell — an empty value reads as a bug. */}
      <dd className="mt-2 text-[13px] leading-snug text-white/70">{value || '—'}</dd>
    </div>
  )
}
