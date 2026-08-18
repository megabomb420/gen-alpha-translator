import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { QUIZ, rankFor } from '../data/quiz'
import { SectionHead, PillButton, Magnetic } from '../components/ui-kit'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

type Phase = 'intro' | 'playing' | 'done'

export default function Quiz() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [q, setQ] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(0)
  const reduce = useReducedMotion()

  const question = QUIZ[q]
  const total = QUIZ.length

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === question.correct) setScore((s) => s + 1)
    else setShake((v) => v + 1)
  }

  const next = () => {
    if (q + 1 >= total) setPhase('done')
    else {
      setQ((v) => v + 1)
      setPicked(null)
    }
  }

  const restart = () => {
    setPhase('intro')
    setQ(0)
    setPicked(null)
    setScore(0)
  }

  return (
    <section id="quiz" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="07"
          kicker="The final exam"
          title={
            <>
              How fluent <span className="text-lime">are you?</span>
            </>
          }
          sub="Eight questions. +1000 aura per correct answer. No pressure. Your child is grading this silently."
        />

        <div className="glass mx-auto max-w-3xl rounded-3xl p-6 md:p-12">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.div
                key="intro"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-center"
              >
                <div className="text-6xl md:text-7xl" aria-hidden>📝</div>
                <p className="font-display mx-auto mt-6 max-w-md text-2xl font-bold leading-snug md:text-3xl">
                  You read the dictionary.
                  <br />
                  <span className="text-dim">Now prove it.</span>
                </p>
                <div className="mt-8">
                  <Magnetic>
                    <PillButton onClick={() => setPhase('playing')}>Start the exam →</PillButton>
                  </Magnetic>
                </div>
                <p className="font-mono2 mt-5 text-[10px] uppercase tracking-[0.3em] text-faint">
                  cheating is a skill issue
                </p>
              </motion.div>
            )}

            {phase === 'playing' && (
              <motion.div
                key={`q-${q}`}
                initial={reduce ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {/* progress */}
                <div className="mb-8 flex items-center gap-4">
                  <span className="font-mono2 text-xs text-dim">
                    {String(q + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-lime"
                      animate={{ width: `${((q + (picked !== null ? 1 : 0)) / total) * 100}%` }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                  <span className="font-mono2 text-xs text-lime">+{score * 1000} aura</span>
                </div>

                <div className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-faint">
                  What does this mean?
                </div>
                <div className="font-display mt-3 text-2xl font-extrabold leading-snug md:text-4xl">
                  “{question.phrase}”
                </div>

                <div className={cn('mt-8 space-y-3', shake > 0 && 'animate-meter-shake')} key={shake}>
                  {question.options.map((opt, i) => {
                    const isCorrect = i === question.correct
                    const isPicked = picked === i
                    const revealed = picked !== null
                    return (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        disabled={revealed}
                        className={cn(
                          'w-full rounded-2xl border px-5 py-4 text-left font-display text-base font-semibold transition-all duration-300 md:text-lg',
                          !revealed && 'border-line bg-white/[0.02] hover:border-[rgba(211,253,80,0.5)] hover:bg-[rgba(211,253,80,0.05)]',
                          revealed && isCorrect && 'border-[rgba(211,253,80,0.6)] bg-[rgba(211,253,80,0.1)] text-lime',
                          revealed && isPicked && !isCorrect && 'border-[rgba(255,93,108,0.6)] bg-[rgba(255,93,108,0.1)] text-red2',
                          revealed && !isPicked && !isCorrect && 'border-line opacity-40',
                        )}
                      >
                        <span className="font-mono2 mr-3 text-xs text-faint">{String.fromCharCode(65 + i)}</span>
                        {opt}
                        {revealed && isCorrect && <span className="float-right">✓</span>}
                        {revealed && isPicked && !isCorrect && <span className="float-right">✗</span>}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {picked !== null && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="mt-6"
                    >
                      <div
                        className={cn(
                          'rounded-xl border-l-2 p-4 text-sm text-dim',
                          picked === question.correct ? 'border-lime' : 'border-red2',
                        )}
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <span className="font-mono2 mr-2 text-[10px] uppercase tracking-widest text-faint">
                          {picked === question.correct ? '+1000 aura —' : '-500 aura —'}
                        </span>
                        {question.note}
                      </div>
                      <div className="mt-5 text-right">
                        <PillButton onClick={next} variant="ghost" className="px-6 py-3 text-xs">
                          {q + 1 >= total ? 'See results →' : 'Next →'}
                        </PillButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div
                key="done"
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-center"
              >
                <div className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-faint">Final score</div>
                <motion.div
                  initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
                  className="font-display mt-4 text-6xl font-extrabold tracking-tight text-lime md:text-8xl"
                >
                  +{(score * 1000).toLocaleString('en-US')}
                </motion.div>
                <div className="font-mono2 mt-1 text-xs uppercase tracking-widest text-dim">aura</div>
                <div className="font-display mt-8 text-2xl font-extrabold uppercase tracking-tight md:text-4xl">
                  {rankFor(score, total).title}
                </div>
                <p className="mx-auto mt-3 max-w-md text-base text-dim">{rankFor(score, total).desc}</p>
                <p className="font-mono2 mt-4 text-xs text-faint">
                  {score} / {total} correct
                </p>
                <div className="mt-8">
                  <Magnetic>
                    <PillButton onClick={restart} variant="ghost">
                      Retake the exam ↻
                    </PillButton>
                  </Magnetic>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
