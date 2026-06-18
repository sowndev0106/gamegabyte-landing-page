import { useEffect, useRef, useState } from 'react'

export function LazyVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

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

  return (
    <video ref={ref} className={className} poster={poster} muted loop playsInline controls preload={load ? 'auto' : 'none'}>
      {load && <source src={src} type="video/mp4" />}
    </video>
  )
}
