import { SECTIONS } from '../../content/sections'

/**
 * The desktop navigation: a fixed column of two-digit section markers. The
 * digits carry no meaning on their own, so each link takes its accessible name
 * from the registry label rather than the number it shows.
 */
export function CommandRail({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-23 flex-col items-center justify-between border-r border-white/11 bg-ink/95 py-6 backdrop-blur-xl md:flex">
      <a
        href="#home"
        aria-label="Gamegabyte home"
        className="rotate-180 font-display text-base font-extrabold tracking-[0.05em] [writing-mode:vertical-rl]"
      >
        GGB
      </a>

      <nav aria-label="Command sections" className="flex flex-col gap-3">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={active === section.id ? 'true' : undefined}
            className={`relative font-mono text-[8px] transition-colors [writing-mode:vertical-rl] ${
              active === section.id ? 'text-accent' : 'text-white/35 hover:text-white'
            }`}
          >
            {section.index}
          </a>
        ))}
      </nav>

      <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-accent [writing-mode:vertical-rl]">
        Online
      </span>
    </aside>
  )
}
