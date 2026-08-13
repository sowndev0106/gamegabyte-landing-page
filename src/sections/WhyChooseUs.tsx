import { content, assets } from '../content/content'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Container } from '../components/ui/Container'
import { Section, GlowSpot } from '../components/ui/Section'
import { SectionHeader } from '../components/ui/SectionHeader'
import { PixelSprite } from '../components/brand/PixelSprite'

export function WhyChooseUs() {
  return (
    <Section
      id="about"
      backdrop={
        <>
          <img
            src={assets.backgrounds.pixelTrees}
            alt=""
            loading="lazy"
            className="pointer-events-none absolute inset-x-0 top-0 h-56 w-full object-cover opacity-10"
          />
          <GlowSpot className="left-[-6%] bottom-[10%] h-[320px] w-[440px]" />
        </>
      }
    >
      <Container>
        <SectionHeader
          index="05"
          eyebrow="Why choose us"
          title="Strategic partners, not just an agency"
          description="We work the way an internal team would — inside your milestones, not alongside them."
        />

        {/*
          One shared stage rather than four boxed cards: the four characters
          stand on the same ground line, which is the point the copy is making.
        */}
        <Stagger className="hud-portrait grid border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {content.why.map((item) => (
            <StaggerItem
              key={item.title}
              className="group flex flex-col items-center px-6 pb-7 pt-9 text-center transition-colors hover:bg-white/[0.035]"
            >
              <div className="relative grid h-[170px] w-full place-items-end justify-center">
                <PixelSprite
                  index={item.sprite}
                  className="h-[150px] w-[150px] transition-transform duration-300 group-hover:-translate-y-2.5"
                />
                {/* Light on the ground ties the four figures to one stage. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[8%] bottom-0 h-px bg-linear-to-r from-transparent via-accent/55 to-transparent"
                />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">{item.tag}</p>
              <h3 className="mt-2.5 font-display text-lg font-bold capitalize leading-tight text-white transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
