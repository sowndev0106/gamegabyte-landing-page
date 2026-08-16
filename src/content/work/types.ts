// Work content cloned from Behance by `npm run clone:behance`.
//
// Nothing in here is hand-edited: `index.json` and `projects/*.json` are
// generated, so a re-clone overwrites them. The types are the contract the
// showcase and detail pages read against.

/** One rendered element of a project page, in the order Behance laid it out. */
export type WorkBlock =
  | {
      type: 'image'
      src: string
      width: number
      height: number
      alt: string
      caption: string
    }
  | {
      // Either a GIF too long to ship as animated WebP, transcoded to h264, or
      // a Vimeo/CCV player pulled onto our own domain by `mirror-video.mjs`.
      type: 'video'
      src: string
      poster: string
      width: number
      height: number
      alt: string
      caption: string
      /**
       * True for a mirrored player, absent for a transcoded GIF. The two behave
       * oppositely and are otherwise indistinguishable at the type level.
       *
       * Deliberately not "has audio": a mirrored film with a silent track is
       * still several megabytes, and autoplaying it on a loop the way a 200KB
       * GIF is autoplayed spends the reader's bandwidth on something they never
       * asked to watch. Weight decides this, not sound.
       */
      player?: boolean
    }
  | {
      // Hosted elsewhere (Vimeo, Adobe CCV) and not mirrored — an iframe URL.
      type: 'embed'
      url: string
      provider: 'vimeo' | 'adobe-ccv' | 'iframe'
      width: number
      height: number
      caption: string
    }
  | { type: 'text'; html: string }

/** What the showcase list needs. Every field is present; some arrive empty. */
export type WorkSummary = {
  id: string
  slug: string
  /** Display name. Hand-written in `overrides.json` where Behance's is a keyword string. */
  title: string
  /** What Behance calls it, kept so the two can be matched up. */
  sourceTitle: string
  /** `sourceTitle` split on '|' — Behance titles are pipe-delimited, ours need not be. */
  titleParts: string[]
  /** '' where the artwork never named one — do not guess on a studio site. */
  client: string
  /** '' means unclassified, not "client work". See overrides.json. */
  engagement: '' | 'client' | 'concept' | 'challenge'
  /** Slot in the homepage archive, 1-based. 0 = not featured. */
  featured: number
  description: string
  cover: string
  coverWidth: number
  coverHeight: number
  tags: string[]
  tools: string[]
  /** ISO date, or '' when Behance had no publish timestamp. */
  publishedOn: string
  sourceUrl: string
  author: { name: string; url: string }
}

export type WorkDetail = WorkSummary & { blocks: WorkBlock[] }

import index from './index.json'

export const workIndex = index as WorkSummary[]

export const workBySlug = new Map(workIndex.map((item) => [item.slug, item]))

/** The homepage archive, in the order `overrides.json` asks for. */
export const featuredWork = workIndex
  .filter((item) => item.featured > 0)
  .sort((a, b) => a.featured - b.featured)

export const workPath = (slug: string) => `/work/${slug}/`

// Detail pages are the long tail of this content — several megabytes of JSON
// across 16 projects — so they load on demand rather than riding in the bundle.
const details = import.meta.glob<{ default: WorkDetail }>('./projects/*.json')

export async function loadWorkDetail(slug: string): Promise<WorkDetail | null> {
  const load = details[`./projects/${slug}.json`]
  if (!load) return null
  return (await load()).default
}
