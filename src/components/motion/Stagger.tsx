import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Variants } from 'motion/react'
import { RISE, RISE_DURATION, RISE_EASE, STAGGER_STEP, REVEAL_AMOUNT } from './motionTokens'

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: STAGGER_STEP } } }
const child: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: { opacity: 1, y: 0, transition: { duration: RISE_DURATION, ease: RISE_EASE } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? undefined : parent}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: REVEAL_AMOUNT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div variants={reduceMotion ? undefined : child} className={className}>
      {children}
    </motion.div>
  )
}
