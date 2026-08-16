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

/**
 * A mirrored sidehead: the work on the left at 70%, everything said about it in
 * a 30% rail on the right that holds station while the work scrolls.
 *
 * This is the reverse of `SectionSplit`'s `split`, which puts its heading rail
 * on the left. The ratio is deliberately the same one — see STYLE.md — because
 * the two are the same idea at different scales, and a second ratio would read
 * as a second system.
 *
 * Reversed because a project page is not a section: the reader came for the
 * work, so the work takes the reading position and the metadata sits at the
 * margin. Below `lg` the rail comes first, so nobody scrolls fifteen images
 * before learning what they are looking at.
 */
export function WorkDetailPage({ project }: { project: WorkDetail }) {
  const position = workIndex.findIndex((item) => item.slug === project.slug)
  const next = workIndex[(position + 1) % workIndex.length]

  return (
    <CommandShell base="/" footer={<Footer />}>
      {/* No `overflow-hidden` here, however much it looks like it belongs on a
          block with an absolute backdrop: `overflow` of anything but `visible`
          on an ancestor silently kills `position: sticky` in every descendant,
          and the metadata rail below depends on it. The backdrop is held by
          `inset-x-0` instead, which is what was actually doing the work. */}
      <article className="relative bg-ink pt-28 pb-20 md:pt-36 md:pb-28">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
        />

        <Container className="relative z-10">
          <a
            href="/work/"
            className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent hover:text-accent-bright"
          >
            <span aria-hidden="true">&lt;</span> Archive
          </a>

          <div className="mt-8 grid items-start gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_30%] lg:gap-14">
            {/*
              First in the DOM so it reads first on a phone and to a screen
              reader — the heading should not arrive after fifteen images. `order`
              moves it right only once there are two columns to move it between.

              `self-start` is what makes the sticky work: a grid item stretches
              to its row by default, and a full-height box has nothing to stick.
            */}
            <aside className="lg:order-2 lg:sticky lg:top-28 lg:self-start">
              <h1 className="font-display text-[clamp(30px,3.3vw,52px)] leading-[0.9] font-extrabold uppercase tracking-tighter text-white">
                {project.title}
              </h1>

              {project.description && (
                <p className="mt-6 text-[15px] leading-relaxed text-white/70">
                  {project.description}
                </p>
              )}

              {/*
                A definition list, not a row of pills: every one of these is a
                labelled value, and a pill row makes the reader guess which
                label each value belongs to. Two columns while the rail is the
                full width of a phone, one once it narrows to 30% — four across
                376px would set every value one word per line.
              */}
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/11 pt-7 lg:grid-cols-1 lg:gap-y-5">
                <Fact label="Year" value={project.publishedOn.slice(0, 4)} />
                <Fact label="Client" value={project.client} />
                <Fact label="Engagement" value={ENGAGEMENT_LABEL[project.engagement] ?? ''} />
                <Fact label="Tools" value={project.tools.join(', ')} />
              </dl>

              {project.tags.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-white/11 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/48"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-2 border-t border-white/11 pt-7 font-mono text-[9px] uppercase tracking-[0.16em] text-white/48 hover:text-white"
              >
                {project.author.name} on Behance
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </aside>

            {/* `min-w-0`, or one wide image pushes the track past its share and
                the split silently stops holding. */}
            <div className="min-w-0 lg:order-1">
              <WorkBlocks blocks={project.blocks} />
            </div>
          </div>

          {/* Full measure, under both columns: this is the exit from the page,
              not a property of either side of it. */}
          <div className="mt-16 border-t border-white/11 pt-10 lg:mt-24">
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
