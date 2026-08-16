import { CommandShell } from '../components/shell/CommandShell'
import { Container } from '../components/ui/Container'
import { ArrowUpRight } from '../components/ui/ArrowUpRight'
import { Footer } from '../sections/Footer'
import { workIndex, workPath } from '../content/work/types'

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
                <a
                  href={workPath(item.slug)}
                  className="group flex h-full flex-col border border-white/11 transition-colors hover:border-accent/40"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.cover}
                      alt=""
                      width={item.coverWidth}
                      height={item.coverHeight}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover saturate-75 transition duration-500 group-hover:scale-[1.025] group-hover:saturate-125"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5.5">
                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
                      {String(i + 1).padStart(2, '0')} / {item.client || item.tags[0] || 'Project'}
                    </span>
                    <h2 className="mt-2.5 flex items-start gap-2 font-display text-[22px] leading-tight font-bold text-white">
                      {item.title}
                      <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </h2>
                    <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-white/48">
                      {item.description}
                    </p>
                    <span className="mt-auto pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                      {item.publishedOn.slice(0, 4)}
                      {item.engagement === 'concept' && ' / Concept'}
                      {item.engagement === 'challenge' && ' / Challenge'}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </CommandShell>
  )
}
