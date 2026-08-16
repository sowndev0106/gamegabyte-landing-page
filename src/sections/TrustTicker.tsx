import { assets } from '../content/content'

/**
 * The client marks as the floor of the hero: a full-bleed band across the bottom
 * edge of the fold, rolling forever.
 *
 * Deliberately unframed — no rule above it, no dividers between the cells, no
 * label. Everything else on this page is structured by hairlines, so a band that
 * carries none reads as the one thing on the fold that is not part of the
 * instrument: marks passing through, not a panel reporting. The hero's own scrim
 * already resolves to near-solid ink at the bottom edge, so the marks stay
 * legible without a ground of their own.
 *
 * Replaces `TrustBar`, which showed the same four marks in a 2x4 panel one
 * section further down. Two copies of one roster on one page is not two pieces
 * of evidence, so the panel went when this landed.
 */

/**
 * How many times the roster is printed per half of the track.
 *
 * The track has to overflow the widest viewport we support or the loop shows a
 * gap, and the count is fixed rather than measured off `window.innerWidth`: a
 * measured count changes the group's width with the viewport, and since the
 * duration is fixed, that silently changes the SPEED of the band per device.
 * Three passes of four marks at 232px is 2784px per half — wider than a 2560px
 * display — so every viewport rolls at the same ~50px/s.
 */
const PASSES = 3

const roster = Array.from({ length: PASSES }, () => assets.clients).flat()

export function TrustTicker() {
  return (
    <div className="trust-ticker relative z-10 pb-4 md:pb-6">
      {/* Two identical halves, so translating the track by exactly -50% lands it
          on a frame identical to the one before it and the seam never enters the
          viewport. */}
      <div className="trust-ticker__rail overflow-hidden">
        <div className="trust-ticker__track flex w-max" aria-hidden="true">
          {[...roster, ...roster].map((client, i) => (
            <div key={i} className="flex h-23 min-w-42 flex-none items-center justify-center px-5.5 md:h-29 md:min-w-58 md:px-8.5">
              {/* NOT `loading="lazy"`, unlike the panel this replaces: the band
                  is above the fold, and most of its track starts outside the
                  viewport — lazy cells rolled in blank and only filled once
                  they had already arrived. */}
              <img
                src={client.logo}
                alt=""
                className="max-h-6.5 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-8.5"
              />
            </div>
          ))}
        </div>
      </div>

      {/* The track is a decorative loop of one list printed six times, so it is
          hidden from assistive tech. The roster is stated once here instead —
          the visible label that used to introduce it is gone, so this list
          carries its own. */}
      <ul className="sr-only" aria-label="Clients">
        {assets.clients.map((client) => (
          <li key={client.name}>{client.name}</li>
        ))}
      </ul>
    </div>
  )
}
