import { motion, useReducedMotion } from 'framer-motion'
import { GENERATION_CHAINS } from '../data/content'
import { SectionHead } from '../components/ui-kit'

const EASE = [0.16, 1, 0.3, 1] as const

const GENS = [
  { key: 'millennial' as const, label: 'MILLENNIAL', color: 'text-faint', arrow: '↓' },
  { key: 'genz' as const, label: 'GEN Z', color: 'text-dim', arrow: '↓' },
  { key: 'alpha' as const, label: 'GEN ALPHA', color: 'text-lime', arrow: null },
]

function Chain({ chain, index }: { chain: (typeof GENERATION_CHAINS)[number]; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      className="glass rounded-3xl p-7 md:p-9"
    >
      <div className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-faint">Human says</div>
      <div className="font-display mt-2 text-2xl font-bold md:text-3xl">{chain.human}</div>

      <div className="mt-7 space-y-0">
        {GENS.map((g, gi) => (
          <div key={g.key}>
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.25 + gi * 0.22 + index * 0.12, duration: 0.5, ease: EASE }}
              className="flex items-center justify-between gap-4 rounded-xl bg-black/25 px-5 py-4"
            >
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-faint">{g.label}</span>
              <span className={`font-display text-xl font-extrabold md:text-2xl ${g.color}`}>{chain[g.key]}</span>
            </motion.div>
            {g.arrow && (
              <motion.div
                aria-hidden
                initial={reduce ? false : { opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.42 + gi * 0.22 + index * 0.12, duration: 0.35 }}
                className="py-1.5 text-center text-lime"
              >
                {g.arrow}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Generations() {
  return (
    <section id="generations" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="06"
          kicker="Evolution"
          title={
            <>
              The generational <span className="text-lime">pipeline</span>
            </>
          }
          sub="Same sentence. Three generations. Watch the meaning compress until only emoji remain."
        />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {GENERATION_CHAINS.map((c, i) => (
            <Chain key={c.human} chain={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
