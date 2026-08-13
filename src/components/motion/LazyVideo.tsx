import { useEffect, useRef, useState } from 'react'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Video with brand-styled controls. The native control bar is deliberately not
 * used — its browser chrome is the one unstyled surface on the page.
 */
export function LazyVideo({
  src,
  poster,
  className,
  'aria-label': ariaLabel,
}: {
  src: string
  poster?: string
  className?: string
  'aria-label'?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) void el.play()
    else el.pause()
  }

  const toggleMute = () => {
    const el = ref.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const seek = (value: number) => {
    const el = ref.current
    if (!el || !Number.isFinite(el.duration)) return
    el.currentTime = (value / 100) * el.duration
    setProgress(value)
  }

  return (
    <div className={`group/player relative overflow-hidden bg-black ${className ?? ''}`}>
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload={load ? 'auto' : 'none'}
        aria-label={ariaLabel}
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const el = e.currentTarget
          if (Number.isFinite(el.duration) && el.duration > 0) {
            setProgress((el.currentTime / el.duration) * 100)
          }
        }}
      >
        {load && <source src={src} type="video/mp4" />}
      </video>

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play showreel"
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-ink/30 transition-colors hover:bg-ink/20"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-ink shadow-[0_0_40px_rgba(182,232,2,0.35)] transition-transform duration-200 group-hover/player:scale-105">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-8 w-8">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-linear-to-t from-ink/90 to-transparent px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause showreel' : 'Play showreel'}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-white transition-colors hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>

        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek showreel"
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-accent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          style={{
            background: `linear-gradient(to right, var(--color-accent) ${progress}%, rgb(255 255 255 / 0.25) ${progress}%)`,
          }}
        />

        <span className="hidden shrink-0 font-mono text-xs tabular-nums text-white/80 sm:block">
          {formatTime((progress / 100) * duration)} / {formatTime(duration)}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-white transition-colors hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
            {muted ? (
              <path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3 2.5 2.5-1 1L15.5 13 13 15.5l-1-1L14.5 12 12 9.5l1-1 2.5 2.5L18 8.5l1 1L16.5 12z" />
            ) : (
              <path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a4 4 0 0 0-2-3.46v6.92A4 4 0 0 0 15.5 12zM13 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
            )}
          </svg>
        </button>
      </div>
    </div>
  )
}
