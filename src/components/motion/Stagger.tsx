import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import type { Variants } from 'motion/react'

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const child: Variants = {
  hidden: { opacity: 0.92, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={reduceMotion ? undefined : parent}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
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
