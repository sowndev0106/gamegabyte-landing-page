import { content, assets } from '../content/content'
import { sectionById } from '../content/sections'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import { Button } from '../components/ui/Button'
import { TrustTicker } from './TrustTicker'

const { index, eyebrow } = sectionById('home')

export function Hero() {
  return (
    <section
      id="home"
      // Fullscreen with a ceiling, expressed as one `min-height` rather than a
      // min/max pair: CSS resolves `min-height` AFTER `max-height`, so pairing
      // `min-h-svh` with a `max-h` silently does nothing — the min always wins.
      // `min(100svh, …)` caps the demand instead, which also lets the section
      // grow past the cap when the content needs it. That matters because this
      // element clips: a real `max-height` would cut a tall mobile layout off
      // rather than let it run on.
      // A column rather than a centred row, because the fold now has a floor:
      // `TrustTicker` is welded to the bottom edge and the content takes what is
      // left. The bottom padding moved onto the content wrapper with it — left
      // here it would have opened a gap between the content and the band.
      className="hud-grid relative flex min-h-[min(100svh,1000px)] flex-col overflow-hidden bg-ink pt-30 md:pt-32.5"
    >
      {/* The right half of the fold, from `lg` up. Pinned by its RIGHT edge, and
          that is the whole trick: `right-0` with `w-[58%]` means the box ends
          flush with the section and grows LEFTWARD across the midpoint instead
          of off the screen. Nothing is clipped horizontally — the art is scaled
          by letting it lean ~8% into the copy's half, not by cropping it.

          The lean is legible because the 90deg scrim is still running there. The
          art's left edge lands around 40% of the section, where the scrim is
          still ~0.4 ink, so the swoosh fades UNDER the headline rather than
          colliding with it. Push the width past ~62% and the character's body —
          not the faint ring — reaches copy the scrim no longer covers.

          `max-h-[88%]` is the guard. The section caps at 1000px but width does
          not, so past ~2500px a 58% width sets a height taller than the fold and
          beheads the character. Height binds there and `object-contain`
          letterboxes inside the box, which is why `object-right-bottom` is
          load-bearing — the default centre would float the art off the edge.

          Nothing is clipped vertically either: `bottom-0` puts the art's own
          bottom edge on the section's, and the height guard keeps the top inside
          the fold.

          It reaches that bottom edge on purpose: `TrustTicker` is a z-10 sibling,
          so the marks roll ACROSS the art rather than sitting on ink below it.

          Below `lg` there is no half to give it — a 50/50 split at 900px leaves
          the copy ~400px, which is narrower than the headline can set — so it
          drops behind the copy as ambience instead, the same job the battlefield
          photo used to do for the whole section. That photo is gone: the mascot
          is a cut-out with real alpha, and two pieces of art competing behind one
          headline is what made the old fold need a 78%-ink scrim across its
          middle. */}
      <img
        src={assets.backgrounds.heroMascot}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[56%] w-auto max-w-[92%] object-contain object-bottom opacity-40 lg:h-auto lg:w-[58%] lg:max-h-[88%] lg:max-w-none lg:object-bottom-right lg:opacity-100"
      />
      {/* Two jobs, one element. The 90deg pass protects the copy: it is fully
          transparent by 50%, exactly where the art's half begins, so the
          character is not dulled to pay for the headline's contrast. The 0deg
          pass is the floor under the client band — the marks are white at 70%
          and would otherwise cross the art's lit ring and disappear. It resolves
          by 26%, which keeps the scrim under the band instead of over the art. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,rgb(5_5_12/0.82)_28%,transparent_50%),linear-gradient(0deg,rgb(5_5_12/0.92),rgb(5_5_12/0.4)_12%,transparent_26%)]"
      />

      {/* The content takes the fold minus its floor. `flex-1` with `items-center`
          is what keeps it optically centred in whatever the band leaves, rather
          than pinned under the topbar. */}
      <div className="relative z-10 flex flex-1 items-center pb-14 md:pb-15">
        {/* Full-bleed on purpose — the hero is the one section that does not sit
            on the page's `Container` measure. Gutter only, and no width cap.

            Not a grid, even though it reads as one. The right half is art that
            has to bleed off two edges, and a grid child cannot — a track would
            clip it at the section's padding. So the split is drawn twice against
            the same midpoint instead: `lg:max-w-1/2` here, `lg:max-w-1/2` on the
            art. The left gutter lives inside the copy's half, so the seam lands
            on the section's true centre.

            The measure is taken from the padding box, so the copy's half is
            `(W - 96) / 2` against the art's `W / 2`. That 48px difference is the
            gutter, and it is why the copy stops a hair short of centre rather
            than butting into the art. */}
        <div className="w-full px-4.5 md:px-12">
          <Stagger className="lg:max-w-1/2">
            <StaggerItem>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                <span aria-hidden="true" className="text-white/45">
                  [{index}]
                </span>{' '}
                {eyebrow}
              </p>
            </StaggerItem>
            <StaggerItem>
              {/* Three sizes, because the headline is measured against three
                  different widths. Below `md` it has the viewport; `md`–`lg` it
                  has the full padding box; from `lg` it has only its half, and
                  the `md` ramp (104px at 1440) sets "WE ARE THE GAME" ~180px
                  wider than that half. `hero.headline` is three fixed lines
                  rendered as block spans, so overflow does not clip — it RE-wraps
                  to four lines, pushing the section past the fold and dragging
                  the client band off screen.

                  So the `lg` ramp is solved rather than picked, and it is solved
                  against the CURRENT copy — change `hero.headline` and this has
                  to be re-derived. The half is `(100vw - 188px) / 2` (188 = rail
                  + both gutters) and this face sets the longest line, "WEBSITES
                  FOR", at 6.80x its font size, so the fit is `vw * 0.0734 -
                  13.7px`; `7.1vw - 13px` is that line with ~3% headroom.
                  Measured 3 lines at 1024, 1152, 1280, 1366, 1440, 1536, 1600,
                  1920 and 2560. It is a slope, NOT a plain vw: a pure ratio
                  cannot clear a half that loses a fixed 188px to chrome — it
                  wraps at the bottom of the range and leaves room at the top. */}
              {/* 13vw, not 14: at 14 the longest line overruns a 390px gutter
                  box by ~17px and breaks as "WEBSITES / FOR", orphaning one word
                  on a line of its own. 13vw clears it down to 320px. */}
              <h1 className="my-6 font-display text-[clamp(34px,13vw,74px)] font-extrabold uppercase leading-[0.82] tracking-[-0.065em] text-white md:text-[clamp(64px,7.2vw,112px)] lg:text-[clamp(48px,calc(7.1vw-13px),112px)]">
                {content.hero.headline.map((line) => (
                  <span key={line.text} className={`block ${line.accent ? 'text-accent' : ''}`}>
                    {line.text}
                  </span>
                ))}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="max-w-162.5 text-base leading-relaxed text-white/70 md:text-lg">{content.hero.sub}</p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button href="#portfolio" variant="accent" showArrow>
                  {content.hero.primaryCta}
                </Button>
                <Button href="#contact" variant="ghost" showArrow={false}>
                  {content.hero.secondaryCta}
                </Button>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>

      <TrustTicker />
    </section>
  )
}
