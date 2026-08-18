import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { RANDOM_BRAINROT } from '../data/content'
import { Magnetic } from '../components/ui-kit'

const EASE = [0.16, 1, 0.3, 1] as const

export default function RandomSlang() {
  const [current, setCurrent] = useState<(typeof RANDOM_BRAINROT)[number] | null>(null)
  const [spin, setSpin] = useState(0)
  const reduce = useReducedMotion()

  const roll = () => {
    let next = RANDOM_BRAINROT[Math.floor(Math.random() * RANDOM_BRAINROT.length)]
    if (current && next.slang === current.slang) {
      next = RANDOM_BRAINROT[(RANDOM_BRAINROT.indexOf(next) + 1) % RANDOM_BRAINROT.length]
    }
    setCurrent(next)
    setSpin((v) => v + 1)
  }

  return (
    <section className="relative px-5 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-dim">
            Feeling brave?
          </p>
          <Magnetic>
            <button
              onClick={roll}
              className="bg-lime glow-lime font-display mt-6 rounded-full px-10 py-6 text-xl font-extrabold uppercase tracking-tight text-black transition-transform duration-200 hover:scale-[1.04] active:scale-95 md:text-2xl"
            >
              🎲 Give me brainrot
            </button>
          </Magnetic>
        </motion.div>

        <div className="mt-10 min-h-[150px]">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={spin}
                initial={reduce ? false : { opacity: 0, y: 24, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -18, rotate: 1.5 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="glass mx-auto max-w-2xl rounded-3xl p-8 md:p-10"
              >
                <div className="font-mono2 text-xl text-lime md:text-2xl">{current.slang}</div>
                <div className="font-display mt-4 text-2xl font-semibold leading-snug md:text-3xl">
                  {current.translation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!current && (
            <p className="font-mono2 pt-10 text-xs uppercase tracking-[0.3em] text-faint">
              press the button. you know you want to.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
