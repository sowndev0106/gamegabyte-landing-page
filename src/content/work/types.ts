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
      // A GIF too long to ship as animated WebP, transcoded to h264.
      type: 'video'
      src: string
      poster: string
      width: number
      height: number
      alt: string
      caption: string
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
  title: string
  /** `title` split on '|' — Behance titles are pipe-delimited, ours need not be. */
  titleParts: string[]
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

// Detail pages are the long tail of this content — several megabytes of JSON
// across 16 projects — so they load on demand rather than riding in the bundle.
const details = import.meta.glob<{ default: WorkDetail }>('./projects/*.json')

export async function loadWorkDetail(slug: string): Promise<WorkDetail | null> {
  const load = details[`./projects/${slug}.json`]
  if (!load) return null
  return (await load()).default
}
