import { SECTIONS } from '../../content/sections'
import { GamegabyteLogo } from '../brand/GamegabyteLogo'

/**
 * The desktop navigation: a fixed column of position markers. The dots carry no
 * text at all, so each link's accessible name comes from the registry label —
 * without it the whole rail would read as twelve unnamed links.
 */
export function CommandRail({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-23 flex-col items-center justify-between border-r border-white/11 bg-ink/95 py-6 backdrop-blur-xl md:flex">
      <a href="#home" aria-label="Gamegabyte home" className="block w-15 shrink-0">
        <GamegabyteLogo className="h-auto w-full" />
      </a>

      <nav aria-label="Command sections" className="flex flex-col gap-1">
        {SECTIONS.map((section) => {
          const isActive = active === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              // The dot is 6px but the target is 24px — a 6px hit area is not
              // a usable control.
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'scale-150 bg-accent shadow-[0_0_12px_var(--color-accent)]'
                    : 'bg-white/30 group-hover:scale-125 group-hover:bg-white/80'
                }`}
              />
            </a>
          )
        })}
      </nav>

      <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-accent [writing-mode:vertical-rl]">
        Online
      </span>
    </aside>
  )
}
