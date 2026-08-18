import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Marquee, LineBreak } from './footer-parts'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setCount(250)
      return
    }
    const start = performance.now()
    const dur = 1200
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setCount(Math.round(250 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce])

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <Marquee
        slow
        items={['bro 😭', "we're cooked 💀", 'yaa 😭🙏', '-5000 aura', 'fr fr', 'ong', 'skill issue', 'mid', '6-7', 'touch grass']}
        className="font-display border-b border-line py-5 text-xl font-extrabold uppercase text-faint md:text-2xl"
      />

      <div ref={ref} className="mx-auto max-w-6xl px-5 py-24 text-center md:px-12 md:py-36">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-[clamp(2.4rem,7vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
        >
          Congratulations.
          <LineBreak />
          <span className="text-dim">You can now understand approximately</span>
          <LineBreak />
          <span className="text-lime">21%</span> of what your child says.
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.5, type: 'spring', stiffness: 160, damping: 14 }}
          className="bg-lime glow-lime font-display mx-auto mt-12 inline-block rounded-full px-10 py-5 text-2xl font-extrabold uppercase tracking-tight text-black md:text-3xl"
        >
          +{count} aura
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-mono2 mt-14 text-[11px] uppercase tracking-[0.3em] text-faint"
        >
          Vocabulary expires approximately 12 minutes after publication.
        </motion.p>

        <div className="font-mono2 mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-[10px] uppercase tracking-[0.25em] text-faint md:flex-row">
          <span>BRO 😭 — Gen Alpha Translator</span>
          <span>no AI was consulted 💀</span>
          <a href="#top" className="text-dim transition-colors hover:text-lime">
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
