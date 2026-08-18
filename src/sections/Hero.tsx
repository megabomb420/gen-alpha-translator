import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion'
import { HERO_EXAMPLES } from '../data/content'
import { Magnetic } from '../components/ui-kit'

const EASE = [0.16, 1, 0.3, 1] as const

function LineReveal({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: delay + i * 0.07, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

function CyclingExamples() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % HERO_EXAMPLES.length), 2100)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="relative h-9 md:h-11 overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="font-mono2 text-lg md:text-2xl text-lime"
        >
          {HERO_EXAMPLES[idx]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 14 })
  const sy = useSpring(my, { stiffness: 60, damping: 14 })
  const emojiX = useTransform(sx, [-0.5, 0.5], [-26, 26])
  const emojiY = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const emojiR = useTransform(sx, [-0.5, 0.5], [-10, 10])

  const { scrollY } = useScroll()
  const ghostY1 = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -140])
  const ghostY2 = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 110])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-24 pb-16 md:px-12"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[90vw] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse, rgba(211,253,80,0.35), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[40vh] w-[50vw] rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(ellipse, rgba(211,253,80,0.5), transparent 60%)' }}
      />

      {/* floating ghost typography */}
      <motion.span
        aria-hidden
        style={{ y: ghostY1 }}
        className="text-stroke font-display pointer-events-none absolute left-[4%] top-[12%] select-none text-[13vw] font-extrabold uppercase leading-none opacity-60"
      >
        cooked
      </motion.span>
      <motion.span
        aria-hidden
        style={{ y: ghostY2 }}
        className="text-stroke font-display pointer-events-none absolute right-[3%] top-[52%] select-none text-[11vw] font-extrabold uppercase leading-none opacity-50"
      >
        aura
      </motion.span>
      <motion.span
        aria-hidden
        style={{ y: ghostY1 }}
        className="text-stroke font-display pointer-events-none absolute bottom-[6%] left-[30%] select-none text-[8vw] font-extrabold uppercase leading-none opacity-40"
      >
        rizz
      </motion.span>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-mono2 mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-dim md:text-xs"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-lime animate-pulse-glow" />
          Gen Alpha → Human // Translation Engine
        </motion.p>

        <h1 className="font-display flex flex-wrap items-center gap-x-6 text-[clamp(4.5rem,17vw,15rem)] font-extrabold uppercase leading-[0.85] tracking-tight">
          <LineReveal text="BRO" delay={0.15} />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { x: emojiX, y: emojiY, rotate: emojiR }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.55 }}
            className="inline-block select-none text-[clamp(3.8rem,14vw,12rem)]"
          >
            😭
          </motion.span>
        </h1>

        <div className="font-display mt-8 text-[clamp(1.5rem,4.2vw,3.2rem)] font-semibold leading-tight tracking-tight text-ink">
          <div>
            <LineReveal text="You thought 😭 meant crying." delay={0.8} />
          </div>
          <div className="text-dim">
            <LineReveal text="You were wrong." delay={1.35} />
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-10"
        >
          <CyclingExamples />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.6, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Magnetic>
            <a
              href="#translator"
              className="bg-lime glow-lime inline-flex items-center gap-3 rounded-full px-9 py-5 font-mono2 text-sm font-bold uppercase tracking-widest text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Translate the brainrot
              <span aria-hidden className="text-lg leading-none">↓</span>
            </a>
          </Magnetic>
          <p className="max-w-xs text-sm leading-relaxed text-faint">
            A survival guide for understanding what your kid is actually saying.
          </p>
        </motion.div>
      </motion.div>

      {/* bottom hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="font-mono2 absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-faint"
      >
        scroll — it gets worse
      </motion.div>
    </header>
  )
}
