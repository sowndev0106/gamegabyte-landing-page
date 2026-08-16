import type { WorkBlock } from '../../content/work/types'

/**
 * A project's body, rendered in the order Behance laid it out.
 *
 * Every block carries its own intrinsic size, so each one reserves its space
 * before the asset arrives. That matters more here than anywhere else on the
 * site: a project page is fifteen full-width images in a column, and without
 * reserved boxes the whole page reflows fifteen times as they load.
 */
export function WorkBlocks({ blocks }: { blocks: WorkBlock[] }) {
  return (
    <div className="flex flex-col gap-3.5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
    </div>
  )
}

function Block({ block, index }: { block: WorkBlock; index: number }) {
  switch (block.type) {
    case 'image':
      return (
        <figure className="border border-white/11">
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            // The first image is the page's largest paintable element, so it
            // must not be deferred; everything below the fold must be.
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
            className="block h-auto w-full"
          />
          <Caption html={block.caption} />
        </figure>
      )

    case 'video':
      return (
        <figure className="border border-white/11">
          {/*
            Two things arrive as one block type and they behave oppositely. A
            transcoded GIF behaves like a GIF: no controls, no sound, no tap to
            start. A mirrored player is a film — it gets controls and waits to be
            asked, and `preload="none"` keeps several megabytes off the wire
            until it is. Autoplaying one is a cost the reader did not agree to.

            `playsInline` on both, or iOS hijacks either one fullscreen.
          */}
          <video
            src={block.src}
            poster={block.poster}
            width={block.width}
            height={block.height}
            controls={block.player}
            autoPlay={!block.player}
            loop={!block.player}
            muted={!block.player}
            preload={block.player ? 'none' : undefined}
            playsInline
            aria-label={block.alt || undefined}
            className="block h-auto w-full"
          />
          <Caption html={block.caption} />
        </figure>
      )

    case 'embed':
      return (
        <figure className="border border-white/11">
          <div
            className="relative h-0 w-full"
            // Padding-bottom rather than aspect-ratio: the ratio comes from
            // data and has to be inline anyway, and this needs no fallback.
            style={{ paddingBottom: `${(block.height / block.width) * 100}%` }}
          >
            <iframe
              src={block.url}
              title={block.caption || 'Project video'}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <Caption html={block.caption} />
        </figure>
      )

    case 'text':
      return (
        <div
          className="work-prose max-w-[70ch] px-1 py-6 text-[15px] leading-relaxed text-white/70"
          // Behance authors this as HTML with inline colours and links. It is
          // the project owner's own copy from their own account, not third-party
          // input, so it renders as authored.
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      )
  }
}

function Caption({ html }: { html: string }) {
  if (!html.trim()) return null
  return (
    <figcaption
      className="work-prose border-t border-white/11 px-5.5 py-4 font-mono text-[10px] tracking-[0.08em] text-white/48"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
