import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Marquee({ children, speed = 25 }: { children: ReactNode; speed?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-12 md:gap-16"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}
