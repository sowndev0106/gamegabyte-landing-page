import { CommandShell } from '../components/shell/CommandShell'
import { Container } from '../components/ui/Container'
import { Footer } from '../sections/Footer'
import { WorkCard } from '../components/work/WorkCard'
import { workIndex } from '../content/work/types'

/**
 * The full archive. The homepage shows three files in an asymmetric frame
 * because three is a shop window; this page shows all of them in one even grid
 * because sixteen ranked by visual weight would be a claim about which work
 * matters, made sixteen times.
 */
export function WorkIndexPage() {
  return (
    <CommandShell base="/" footer={<Footer />}>
      <section className="relative overflow-hidden bg-ink pt-32 pb-19.5 md:pt-40 md:pb-28">
        <div
          aria-hidden="true"
          className="hud-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <Container className="relative z-10">
          <span className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true">[07]</span> Archive / {String(workIndex.length).padStart(2, '0')} files
          </span>
          <h1 className="mt-6 max-w-[16ch] font-display text-[44px] leading-[0.94] font-bold uppercase text-white md:text-[72px]">
            Project <span className="text-accent">Showcase</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-white/60">
            Game websites, campaign pages and interface systems shipped for game teams — from
            AAA launch sites to in-game UI.
          </p>
        </Container>
      </section>

      <section className="bg-ink pb-24 md:pb-32">
        <Container>
          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {workIndex.map((item, i) => (
              <li key={item.slug}>
                <WorkCard item={item} index={i + 1} eager={i < 3} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </CommandShell>
  )
}
