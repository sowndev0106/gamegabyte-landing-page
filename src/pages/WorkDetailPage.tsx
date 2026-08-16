import { CommandShell } from '../components/shell/CommandShell'
import { Container } from '../components/ui/Container'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'
import { Footer } from '../sections/Footer'
import { WorkBlocks } from '../components/work/WorkBlocks'
import { WorkCard } from '../components/work/WorkCard'
import { workIndex, type WorkDetail } from '../content/work/types'

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
  // Rotated rather than sliced, so the strip is always full and never shows the
  // file the reader is already on. `findIndex` returning -1 means the project is
  // not in the index at all, and the unrotated list is the right answer there.
  const position = workIndex.findIndex((item) => item.slug === project.slug)
  const related = (
    position < 0 ? workIndex : [...workIndex.slice(position + 1), ...workIndex.slice(0, position)]
  ).slice(0, 3)

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
          {/* Sticky at the rail's own offset, so once both are pinned the exit
              and the project title read as one row rather than two loose marks.
              A chip, not bare text: this travels over fifteen full-bleed images
              and 9px accent type on artwork is unreadable. */}
          <div className="z-20 w-fit lg:sticky lg:top-28">
            <a
              href="/work/"
              className="inline-flex items-center gap-2 border border-white/11 bg-ink/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent backdrop-blur-xl hover:border-accent/40 hover:text-accent-bright"
            >
              <span aria-hidden="true">&lt;</span> Archive
            </a>
          </div>

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
              not a property of either side of it. Three files rather than the
              whole archive — this page is already fifteen images long, and a
              sixteen-card grid at the foot of it would compete with both the
              archive link at the top and the footer below. */}
          <div className="mt-16 border-t border-white/11 pt-10 lg:mt-24">
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/30">
                More files
              </span>
              <a
                href="/work/"
                className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/48 hover:text-white"
              >
                All {workIndex.length} files
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <WorkCard item={item} />
                </li>
              ))}
            </ul>
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
