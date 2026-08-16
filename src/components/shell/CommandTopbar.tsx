import { content } from '../../content/content'
import { ArrowUpRight } from '../ui/ArrowUpRight'

/** Desktop status strip. Starts where the rail ends so the two read as one frame. */
export function CommandTopbar() {
  return (
    <header className="fixed inset-x-0 left-23 top-0 z-30 hidden h-18 items-center justify-between border-b border-white/11 bg-ink/90 pl-11 backdrop-blur-xl md:flex">
      <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/70">
        <span aria-hidden="true" className="command-status-dot h-1.5 w-1.5 rounded-full bg-accent" />
        {content.shell.status}
      </span>
      <a
        href="#contact"
        className="flex h-18 items-center gap-2 bg-accent px-11 font-display text-sm font-bold uppercase text-ink transition-colors hover:bg-accent-bright"
      >
        {content.shell.cta}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </header>
  )
}
