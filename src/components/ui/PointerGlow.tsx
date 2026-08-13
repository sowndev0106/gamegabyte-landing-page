import type { PointerEvent, ReactNode } from 'react'

export function PointerGlow({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <div className={`pointer-glow ${className}`} onPointerMove={handlePointerMove}>
      {children}
    </div>
  )
}
