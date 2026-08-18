import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { AURA_SCENARIOS, type AuraScenario } from '../data/content'
import { SectionHead } from '../components/ui-kit'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const
const MAX = 8000

function Meter({ scenario }: { scenario: AuraScenario }) {
  const deleted = scenario.value === 'deleted'
  const value = deleted ? 0 : (scenario.value as number)
  const spring = useSpring(0, { stiffness: 60, damping: 16 })
  const width = useTransform(spring, (v) => `${Math.min(100, (Math.abs(v) / MAX) * 100)}%`)
  const display = useTransform(spring, (v) => (deleted ? 'DELETED' : `${v > 0 ? '+' : ''}${Math.round(v).toLocaleString('en-US')}`))
  const [text, setText] = useState('0')
  const reduce = useReducedMotion()

  useEffect(() => {
    spring.set(value)
    const unsub = display.on('change', (v) => setText(String(v)))
    return unsub
  }, [value, spring, display, deleted])

  const positive = value > 0

  return (
    <div className={cn('rounded-2xl border border-line bg-black/40 p-6 md:p-8', deleted && 'animate-meter-shake')}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-faint">Aura meter</span>
        <motion.span
          key={scenario.id}
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className={cn(
            'font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl',
            deleted ? 'text-red2' : positive ? 'text-lime' : 'text-red2',
          )}
        >
          {deleted ? 'AURA: DELETED' : `${text} AURA`}
        </motion.span>
      </div>

      {/* gaming-style meter */}
      <div className="relative mt-6 h-6 overflow-hidden rounded-full bg-white/[0.06]">
        {/* center line */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/25" aria-hidden />
        {/* ticks */}
        {[25, 50, 75].map((p) => (
          <div key={p} aria-hidden className="absolute top-1 h-4 w-px bg-white/10" style={{ left: `${p}%` }} />
        ))}
        <motion.div
          className={cn('absolute top-0 h-full rounded-full')}
          style={{
            width,
            [positive ? 'left' : 'right']: '50%',
            background: deleted
              ? 'repeating-linear-gradient(45deg, var(--red), var(--red) 6px, transparent 6px, transparent 12px)'
              : positive
                ? 'linear-gradient(90deg, rgba(211,253,80,0.5), var(--lime))'
                : 'linear-gradient(90deg, var(--red), rgba(255,93,108,0.5))',
            boxShadow: positive ? '0 0 24px rgba(211,253,80,0.4)' : '0 0 24px rgba(255,93,108,0.4)',
          }}
        />
      </div>
      <div className="font-mono2 mt-2 flex justify-between text-[9px] uppercase tracking-widest text-faint">
        <span>-8000</span>
        <span>0</span>
        <span>+8000</span>
      </div>
    </div>
  )
}

export default function AuraMeter() {
  const [active, setActive] = useState<AuraScenario>(AURA_SCENARIOS[0])
  const reduce = useReducedMotion()

  return (
    <section id="aura" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="04"
          kicker="Interactive"
          title={
            <>
              Aura <span className="text-lime">check</span>
            </>
          }
          sub="Aura is an invisible currency. Your child is trading it daily. You are mostly losing it. Select a scenario to see the damage."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {AURA_SCENARIOS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}
              onClick={() => setActive(s)}
              aria-pressed={active.id === s.id}
              className={cn(
                'glass rounded-2xl p-5 text-left transition-all duration-300 md:p-6',
                active.id === s.id
                  ? 'border-[rgba(211,253,80,0.5)] bg-[rgba(211,253,80,0.06)]'
                  : 'hover:border-[rgba(211,253,80,0.25)]',
              )}
            >
              <div className="font-display text-lg font-semibold leading-snug md:text-xl">{s.scenario}</div>
              <div
                className={cn(
                  'font-mono2 mt-3 text-xs font-bold uppercase tracking-widest',
                  s.value === 'deleted' || (s.value as number) < 0 ? 'text-red2' : 'text-lime',
                )}
              >
                {s.label}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Meter scenario={active} />
            </motion.div>
          </AnimatePresence>
          <p className="font-mono2 mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-faint">
            Understanding „bro 😭” gives you aura. Saying it to your daughter removes it again.
          </p>
        </div>
      </div>
    </section>
  )
}
