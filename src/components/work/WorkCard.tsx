import { ArrowUpRight } from '../ui/ArrowUpRight'
import { workPath, type WorkSummary } from '../../content/work/types'

/**
 * One file in the archive. Shared by the archive grid and the strip at the foot
 * of a project page, because a card that reads two ways in two places reads as
 * two kinds of thing.
 *
 * `index` is optional and that is the whole difference between the two uses. In
 * the archive the number is a position in a complete list and means something;
 * in a three-item strip it would number a set the reader cannot see the rest of,
 * so the client stands in its place.
 */
export function WorkCard({
  item,
  index,
  eager = false,
}: {
  item: WorkSummary
  index?: number
  eager?: boolean
}) {
  return (
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
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="aspect-[4/3] w-full object-cover saturate-75 transition duration-500 group-hover:scale-[1.025] group-hover:saturate-125"
        />
      </div>

      <div className="flex flex-1 flex-col p-5.5">
        <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
          {index !== undefined && `${String(index).padStart(2, '0')} / `}
          {item.client || item.tags[0] || 'Project'}
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
  )
}
