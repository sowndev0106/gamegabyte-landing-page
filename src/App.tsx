import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { useRef, useState } from 'react'

// Demo 1: stagger reveal khi load
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Hero />
      <ScrollParallax />
      <HoverCards />
    </div>
  )
}

function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-4"
      >
        <motion.h1
          variants={item}
          className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent"
        >
          GameGabyte
        </motion.h1>
        <motion.p variants={item} className="max-w-md text-lg text-neutral-400">
          React + Vite + TypeScript + Tailwind + Motion — sẵn sàng cho animation.
        </motion.p>
        <motion.a
          variants={item}
          href="#cards"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-violet-600 px-6 py-3 font-medium"
        >
          Cuộn xuống xem demo
        </motion.a>
      </motion.div>
    </section>
  )
}

// Demo 2: scroll-linked parallax
function ScrollParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])

  return (
    <section ref={ref} className="flex min-h-screen items-center justify-center">
      <motion.div
        style={{ y, opacity }}
        className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-16 py-24 text-4xl font-bold"
      >
        Scroll Parallax
      </motion.div>
    </section>
  )
}

// Demo 3: hover + tap interaction
function HoverCards() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <section id="cards" className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <h2 className="text-3xl font-semibold">Hover / Tap</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[1, 2, 3].map((n) => (
          <motion.button
            key={n}
            onClick={() => setActive(active === n ? null : n)}
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.92 }}
            animate={{ backgroundColor: active === n ? '#7c3aed' : '#262626' }}
            className="h-40 w-40 rounded-2xl text-2xl font-bold"
          >
            {n}
          </motion.button>
        ))}
      </div>
    </section>
  )
}

export default App
