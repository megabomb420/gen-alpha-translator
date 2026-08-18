import { motion, useReducedMotion } from 'framer-motion'
import { SAFETY_LISTS } from '../data/content'
import { SAFETY_META } from '../data/dictionary'
import { SectionHead } from '../components/ui-kit'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

const TIER_STYLE = {
  safe: { border: 'hover:border-[rgba(211,253,80,0.5)]', text: 'text-lime', bg: 'rgba(211,253,80,0.07)' },
  caution: { border: 'hover:border-[rgba(255,217,125,0.5)]', text: 'text-amber2', bg: 'rgba(255,217,125,0.07)' },
  dont: { border: 'hover:border-[rgba(255,93,108,0.5)]', text: 'text-red2', bg: 'rgba(255,93,108,0.07)' },
} as const

export default function SafetyGuide() {
  const reduce = useReducedMotion()
  return (
    <section id="safety" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="05"
          kicker="Damage control"
          title={
            <>
              Should I <span className="text-lime">say this?</span>
            </>
          }
          sub="Rule #1: Learn the language. Rule #2: Do not attempt to speak it. Here is the official classification."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {SAFETY_LISTS.map((tier, i) => {
            const meta = SAFETY_META[tier.tier]
            const style = TIER_STYLE[tier.tier]
            return (
              <motion.div
                key={tier.tier}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className={cn('glass rounded-3xl border border-line p-7 transition-colors duration-300 md:p-8', style.border)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {meta.dot}
                  </span>
                  <h3 className={cn('font-display text-lg font-extrabold uppercase tracking-tight md:text-xl', style.text)}>
                    {meta.label}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-dim">{meta.note}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {tier.terms.map((t, j) => (
                    <motion.span
                      key={t}
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.03, duration: 0.3 }}
                      className="rounded-full px-3.5 py-1.5 font-mono2 text-xs text-ink"
                      style={{ backgroundColor: style.bg }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono2 mt-8 text-center text-xs uppercase tracking-[0.25em] text-faint"
        >
          “hello fellow kids” → <span className="text-red2">permanent ban</span>
        </motion.p>
      </div>
    </section>
  )
}
