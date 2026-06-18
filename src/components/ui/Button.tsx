import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export function Button({
  children,
  href = '#',
  variant = 'accent',
  showArrow = true,
}: {
  children: ReactNode
  href?: string
  variant?: 'accent' | 'light' | 'dark'
  showArrow?: boolean
}) {
  const classes = {
    accent: 'border-accent bg-accent text-ink shadow-[0_0_28px_rgba(182,232,2,0.18)]',
    light: 'border-white bg-white text-ink',
    dark: 'border-white/15 bg-white/5 text-white',
  }[variant]

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex min-h-16 items-center justify-center gap-2 border px-8 py-4 text-base font-bold uppercase ${classes}`}
    >
      {children}
      {showArrow && (
        <span aria-hidden="true" className="ml-2 text-lg leading-none">
          ↗
        </span>
      )}
    </motion.a>
  )
}
