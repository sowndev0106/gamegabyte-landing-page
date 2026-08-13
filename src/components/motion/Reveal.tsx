import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { RISE, RISE_DURATION, RISE_EASE, REVEAL_AMOUNT } from './motionTokens'

export function Reveal({
  children,
  delay = 0,
  y = RISE,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: REVEAL_AMOUNT }}
      transition={{ duration: RISE_DURATION, ease: RISE_EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
