import { SECTIONS } from '../../content/sections'
import { GamegabyteLogo } from '../brand/GamegabyteLogo'
import { RISE_EASE } from '../motion/motionTokens'

/**
 * Taken from the shared reveal token rather than written out again, so the ticks
 * settle with the same curve section content rises on.
 */
const EASE = `cubic-bezier(${RISE_EASE.join(',')})`

/** Every third mark is long, which turns nine ticks into a readable scale. */
const MAJOR_EVERY = 3

/**
 * How far a tick extends, in pixels.
 *
 * The active tick is the reading. Its immediate neighbours extend part of the
 * way so the scale *swells* around it instead of one mark lighting up alone —
 * that swell is what makes nine separate marks read as one continuous ruler
 * as it travels. Beyond two rows out the scale sits at rest.
 */
function tickWidth(distance: number, isMajor: boolean): number {
  if (distance === 0) return 44
  const rest = isMajor ? 20 : 12
  if (distance === 1) return rest + 10
  if (distance === 2) return rest + 4
  return rest
}

/**
 * The desktop navigation: a measuring scale down the edge of the page, with the
 * live section as the reading. Three things move, all of them driven by scroll
 * rather than running on their own — the page already spends its continuous
 * animations on the status dot, the topbar cursor and the hero's client band:
 *
 *  1. the swell travels along the scale (see `tickWidth`);
 *  2. each tick starts a beat after the one nearer the reading, so the swell
 *     spreads outward instead of the whole column snapping at once;
 *  3. the index prints beside the reading once the tick has finished extending.
 *
 * The ticks carry no text, so each link's accessible name comes from the
 * registry label — without it the whole rail would read as nine unnamed links.
 */
export function CommandRail({ active, base = '' }: { active: string; base?: string }) {
  // -1 before any section owns the viewport, which leaves the scale at rest
  // rather than taking a reading on the first section by default.
  const activeIndex = SECTIONS.findIndex((section) => section.id === active)

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-23 flex-col items-center justify-between border-r border-white/11 bg-ink/95 py-6 backdrop-blur-xl md:flex">
      <a href={`${base}#home`} aria-label="Gamegabyte home" className="block w-15 shrink-0">
        <GamegabyteLogo className="h-auto w-full" />
      </a>

      <nav aria-label="Command sections" className="flex w-full flex-col pl-5">
        {SECTIONS.map((section, index) => {
          const isActive = index === activeIndex
          // No reading yet means every tick is equally far from it, so the
          // whole scale rests rather than swelling around section one.
          const distance = activeIndex < 0 ? Infinity : Math.abs(index - activeIndex)

          return (
            <a
              key={section.id}
              href={`${base}#${section.id}`}
              aria-label={section.label}
              aria-current={isActive ? 'true' : undefined}
              // The tick is 1px tall but the target is 24px — a 1px hit area is
              // not a usable control.
              className="group flex h-6 items-center"
            >
              {/*
                Width, height and delay are inline because they are computed per
                tick; colour stays in classes. Keeping the two apart also avoids
                Tailwind's stylesheet-order conflict resolution deciding which of
                two height utilities wins.
              */}
              <span
                aria-hidden="true"
                style={{
                  width: tickWidth(distance, index % MAJOR_EVERY === 0),
                  height: isActive ? 2 : 1,
                  transitionTimingFunction: EASE,
                  // Capped at three steps: past that the delay would outlast the
                  // scroll that caused it, and the far end of the scale would
                  // still be settling into a reading the page had moved on from.
                  transitionDelay: `${Math.min(distance, 3) * 26}ms`,
                }}
                className={`origin-left transition-[width,height,background-color,scale] duration-400 ${
                  isActive
                    ? 'bg-accent shadow-[0_0_12px_var(--color-accent)]'
                    : 'bg-white/30 group-hover:scale-x-125 group-hover:bg-white'
                }`}
              />

              <span
                aria-hidden="true"
                style={{
                  translate: isActive ? 0 : '-4px',
                  transitionTimingFunction: EASE,
                  // Waits for the tick to finish extending, so the reading is
                  // printed after the needle lands rather than alongside it.
                  transitionDelay: isActive ? '150ms' : '0ms',
                }}
                className={`ml-1.5 font-mono text-[8px] tracking-widest transition-[opacity,translate] duration-300 ${
                  isActive ? 'text-accent opacity-100' : 'opacity-0'
                }`}
              >
                {section.index}
              </span>
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
