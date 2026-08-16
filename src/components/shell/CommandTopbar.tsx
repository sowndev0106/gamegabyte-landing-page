import { content } from '../../content/content'
import { NAV_GROUPS, activeGroupId } from '../../content/sections'
import { ArrowUpRight } from '../ui/ArrowUpRight'

/**
 * Desktop command bar. Starts where the rail ends so the two read as one frame.
 *
 * Two halves, both of them prompt syntax:
 *
 *  - left, the five nav groups. The group being read carries a lime `>` caret
 *    and full-white text, the rest sit back at `white/48`. The caret is the
 *    whole treatment — no underline, no fill, no travelling marker.
 *  - right, the working directory, formatted by `shellPath`. On the homepage
 *    the section owning the viewport becomes `gamegabyte:~/work/archive`, so
 *    scrolling reads as `cd`; on a sub-page the document's URL does, so the
 *    readout is never at `~` while the reader is inside the archive.
 *
 * How it collapses, in the order things can be spared:
 *
 *  - below `lg` the path goes, and the nav spacing and CTA padding tighten.
 *    Measured at `md` (760px, the narrowest the bar ever renders) this leaves
 *    127px between the last group and the CTA, so the groups never wrap.
 *  - below `md` the whole bar goes and `MobileCommandBar` takes over with all
 *    nine sections. Groups are a desktop compression; the sheet has room for
 *    the real list.
 */
export function CommandTopbar({
  active,
  base = '',
  path,
}: {
  active: string
  base?: string
  /** Already formatted by `shellPath` — the bar prints it, it does not derive it. */
  path: string
}) {
  const activeGroup = activeGroupId(active)

  return (
    <header className="fixed inset-x-0 left-23 top-0 z-30 hidden h-18 items-center border-b border-white/11 bg-ink/90 backdrop-blur-xl md:flex">
      {/*
        Labelled distinctly from the rail's own `nav`. Both list the same
        destinations at different resolutions, and two landmarks sharing one
        name is exactly what makes a screen reader's landmark list useless.
      */}
      <nav aria-label="Section groups" className="flex items-center pl-6 lg:pl-11">
        {NAV_GROUPS.map((group) => {
          const isActive = group.id === activeGroup

          return (
            <a
              key={group.id}
              href={`${base}#${group.sections[0]}`}
              aria-current={isActive ? 'true' : undefined}
              className={`flex items-center gap-1.5 pr-4 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors lg:pr-7 ${
                isActive ? 'text-white' : 'text-white/48 hover:text-white'
              }`}
            >
              {/*
                Rendered at every position and merely faded, never removed —
                taking it out of the flow would shift the whole row sideways
                each time the reading moves to another group.
              */}
              <span
                aria-hidden="true"
                className={`text-accent transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}
              >
                &gt;
              </span>
              {group.label}
            </a>
          )
        })}
      </nav>

      {/*
        One `ml-auto` on the group, not on each child. Two auto margins would
        split the free space between them and strand the readout mid-bar.
      */}
      <div className="ml-auto flex items-center self-stretch">
        {/*
          The working directory. Scrolling into a section is the `cd`, so this
          reports where the reader actually is rather than restating a fixed
          claim. Hidden from assistive tech: `aria-current` on the nav already
          exposes the same state as a name, and spelling a path out loud on
          every scroll would be noise.
        */}
        {/*
          Uppercase like every other mono string on the page — a lowercase path
          is closer to a real shell, but it was the one string in the bar not
          shouting, which read as a different system rather than a detail.

          No `$` terminator: the blinking cursor already marks where the line
          ends, and a dim `$` wedged between the path and the cursor read as a
          smudge rather than as syntax.
        */}
        <span
          aria-hidden="true"
          className="hidden items-center pr-8 font-mono text-[9px] uppercase tracking-[0.16em] lg:flex"
        >
          <span className="shrink-0 text-white/30">{content.shell.host}:</span>
          {/*
            Bounded and clipped, because the archive slugs come from Behance and
            the longest is 51 characters — `~/work/gaming-website-design-clash-of
            -clans-website-revamp` set at this tracking would run past the CTA
            and shove it off the bar. A shell that runs out of room and cuts the
            line is the right failure here; a bar that reflows is not.
          */}
          <span className="max-w-[26ch] truncate text-white/70">{path}</span>
          {/*
            Square, not round — with the status sentence gone nothing here needs
            to be a dot, and the page allows no other rounded edge.
          */}
          <span className="command-cursor ml-2 h-3 w-1.5 shrink-0 bg-accent" />
        </span>

        <a
          href={`${base}#contact`}
          className="flex items-center gap-2 self-stretch bg-accent px-6 font-display text-sm font-bold uppercase text-ink transition-colors hover:bg-accent-bright lg:px-11"
        >
          {content.shell.cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  )
}
