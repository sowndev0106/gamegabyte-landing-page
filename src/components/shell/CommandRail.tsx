import { SECTIONS } from '../../content/sections'
import { GamegabyteLogo } from '../brand/GamegabyteLogo'

/**
 * The desktop navigation: twelve nodes threaded onto one spine that fills as the
 * reader descends, so the rail reports progress through the page as well as
 * position. The nodes carry no text at all, so each link's accessible name comes
 * from the registry label — without it the whole rail would read as twelve
 * unnamed links.
 */
export function CommandRail({ active }: { active: string }) {
  // -1 before any section owns the viewport, which leaves the spine empty
  // rather than lighting the first node by default.
  const activeIndex = SECTIONS.findIndex((section) => section.id === active)
  const progress = activeIndex <= 0 ? 0 : activeIndex / (SECTIONS.length - 1)

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-23 flex-col items-center justify-between border-r border-white/11 bg-ink/95 py-6 backdrop-blur-xl md:flex">
      <a href="#home" aria-label="Gamegabyte home" className="block w-15 shrink-0">
        <GamegabyteLogo className="h-auto w-full" />
      </a>

      <nav aria-label="Command sections" className="relative flex flex-col">
        {/*
          The track spans node centre to node centre, so `inset-y-3` is half an
          item's `h-6` — the two have to move together. Keeping the fill inside
          the track means its percentage height resolves against the track and
          not the taller nav, so progress lands exactly on the live node.
        */}
        <span
          aria-hidden="true"
          className="absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-white/15"
        >
          <span
            className="block w-px bg-accent shadow-[0_0_10px_var(--color-accent)] transition-[height] duration-300 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
        </span>

        {SECTIONS.map((section, index) => {
          const isActive = index === activeIndex
          // Sections already passed stay lit so the filled spine reads as one
          // continuous run rather than a line with gaps in it.
          const isPast = index < activeIndex
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              // The node is 7px but the target is 24px — a 7px hit area is not
              // a usable control.
              className="group relative flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-1.75 w-1.75 rounded-full border transition-all duration-200 ${
                  isActive
                    ? 'scale-150 border-accent bg-accent shadow-[0_0_12px_var(--color-accent)]'
                    : isPast
                      ? 'border-accent bg-accent'
                      : // `bg-ink` is opaque so the track does not show through
                        // the middle of an unvisited node.
                        'border-white/35 bg-ink group-hover:scale-125 group-hover:border-white'
                }`}
              />
            </a>
          )
        })}
      </nav>

      <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-accent [writing-mode:vertical-rl]">
        Online
      </span>
    </aside>
  )
}
