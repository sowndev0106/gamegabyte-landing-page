import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Counts a numeric stat up once it scrolls into view. Non-numeric parts of the
 * value ("+", "%", "2024") are preserved verbatim so the markup stays honest.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  // Non-numeric values and reduced-motion users read the final value directly,
  // so `count` is only ever consulted while an animation is possible.
  const animatable = target !== null && !reduceMotion
  const [count, setCount] = useState(`0${suffix}`)
  const display = animatable ? count : value

  useEffect(() => {
    if (!animatable) return
    const el = ref.current
    if (!el) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1100
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          // ease-out so the number settles rather than stopping dead
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(`${Math.round(target! * eased)}${suffix}`)
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [animatable, target, suffix])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
