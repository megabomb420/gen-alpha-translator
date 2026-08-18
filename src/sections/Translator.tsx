import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { translate, type TranslationResult } from '../lib/translate'
import { SectionHead, PillButton, Magnetic, BrainrotDots, SafetyMark, Reveal } from '../components/ui-kit'
import { CATEGORY_LABEL } from '../data/dictionary'
import { TRANSLATOR_EXAMPLES } from '../data/content'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

function UnmatchedNote({ kind }: { kind: 'standard' | 'unknown' }) {
  return (
    <div className="font-mono2 mt-0.5 text-[11px] leading-snug text-faint">
      {kind === 'standard'
        ? '→ standard word — no Gen Alpha translation'
        : '→ not found in the slang database'}
    </div>
  )
}

export default function Translator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [runId, setRunId] = useState(0)
  const reduce = useReducedMotion()

  const run = useCallback((text: string) => {
    if (!text.trim()) return
    setResult(translate(text))
    setRunId((v) => v + 1)
  }, [])

  return (
    <section id="translator" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="01"
          kicker="The translator"
          title={
            <>
              Gen Alpha <span className="text-lime">→ Human</span>
            </>
          }
          sub="Paste the message. We break it down word by word and hand you a plain-English version. Runs entirely on this page — no AI was consulted. It would not have understood either."
        />

        {/* ── worked examples: INPUT → OUTPUT → CONTEXT ── */}
        <div className="mb-12 grid gap-3 md:grid-cols-2">
          {TRANSLATOR_EXAMPLES.map((ex, i) => (
            <Reveal key={ex.input} delay={(i % 2) * 0.08}>
              <div className="glass group h-full rounded-2xl p-5 transition-colors duration-300 hover:border-[rgba(211,253,80,0.3)] md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-mono2 text-sm font-bold text-lime">{ex.input}</div>
                  <span className="font-mono2 mt-0.5 shrink-0 text-[9px] uppercase tracking-widest text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="font-display mt-3 text-lg font-semibold leading-snug md:text-xl">{ex.output}</div>
                <p className="mt-2 text-sm leading-relaxed text-dim">{ex.context}</p>
                <button
                  onClick={() => {
                    setInput(ex.input)
                    run(ex.input)
                    document.getElementById('translator-input')?.focus()
                  }}
                  className="font-mono2 mt-4 text-[10px] uppercase tracking-widest text-faint transition-colors hover:text-lime"
                >
                  run it ↗
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="glass rounded-3xl p-5 md:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              run(input)
            }}
            className="flex flex-col gap-4 md:flex-row"
          >
            <label htmlFor="translator-input" className="sr-only">
              Paste what your kid said
            </label>
            <input
              id="translator-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste what your kid said…"
              autoComplete="off"
              spellCheck={false}
              className="min-h-[64px] flex-1 rounded-2xl border border-line bg-black/40 px-6 font-mono2 text-lg text-ink placeholder:text-faint focus:border-[rgba(211,253,80,0.5)] focus:outline-none md:text-xl"
            />
            <Magnetic>
              <PillButton type="submit" className="min-h-[64px] w-full justify-center md:w-auto">
                Translate →
              </PillButton>
            </Magnetic>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="font-mono2 mr-1 text-[10px] uppercase tracking-widest text-faint">try:</span>
            {['nahhh bro got mogged 🥀', "ong istg she ate that 😭", "i'm finna crash out 😭", 'left me on read smh'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s)
                  run(s)
                }}
                className="rounded-full border border-line px-4 py-2 font-mono2 text-xs text-dim transition-colors hover:border-[rgba(211,253,80,0.5)] hover:text-lime"
              >
                {s}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={runId}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-10"
              >
                {/* token breakdown */}
                <div className="flex flex-wrap items-stretch gap-2.5">
                  {result.tokens
                    .filter((t) => !t.isWhitespace)
                    .map((t, i) =>
                      t.entry ? (
                        <motion.div
                          key={i}
                          initial={reduce ? false : { opacity: 0, y: 14, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                          className="rounded-xl border border-[rgba(211,253,80,0.35)] bg-[rgba(211,253,80,0.07)] px-4 py-3"
                        >
                          <div className="font-display text-lg font-bold uppercase tracking-tight text-lime">
                            {t.raw}
                          </div>
                          <div className="font-mono2 mt-0.5 text-[11px] text-dim">→ “{t.entry.pl}”</div>
                          {t.entry.expansion && (
                            <div className="font-mono2 text-[10px] text-faint">({t.entry.expansion})</div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key={i}
                          initial={reduce ? false : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                          className={cn(
                            'rounded-xl border px-4 py-3',
                            result.classifyWord(t.raw) === 'standard'
                              ? 'border-line bg-white/[0.02] opacity-70'
                              : 'border-dashed border-[rgba(255,93,108,0.4)] bg-[rgba(255,93,108,0.04)]',
                          )}
                        >
                          <div className="font-display text-lg font-bold text-dim">{t.raw}</div>
                          <UnmatchedNote kind={result.classifyWord(t.raw) === 'standard' ? 'standard' : 'unknown'} />
                        </motion.div>
                      ),
                    )}
                </div>

                {/* fallback notice when nothing matched */}
                {result.matched.length === 0 && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4, ease: EASE }}
                    className="mt-6 rounded-xl border border-line bg-white/[0.02] p-5 text-sm text-dim"
                  >
                    {result.tokens.filter((t) => !t.isWhitespace).every((t) => result.classifyWord(t.raw) === 'standard') ? (
                      <>
                        <span className="text-ink">Nothing to decode here.</span> Everything you entered is standard
                        English — no Gen Alpha slang detected.
                      </>
                    ) : (
                      <>
                        <span className="text-ink">Not found in the database.</span> Check the spelling or try a
                        different word — slang mutates roughly every 12 minutes.
                      </>
                    )}
                  </motion.div>
                )}

                {/* details of matched entries */}
                {result.matched.length > 0 && (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {result.matched.map(({ token, entry }, i) => (
                      <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: EASE }}
                        className="flex items-start justify-between gap-4 rounded-xl bg-white/[0.02] p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono2 text-sm font-bold text-ink">{token.raw}</span>
                            <span className="font-mono2 text-[9px] uppercase tracking-wider text-faint">
                              {CATEGORY_LABEL[entry.category]}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-dim">{entry.meaning}</p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <BrainrotDots level={entry.brainrot} />
                          <SafetyMark safety={entry.safety} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* human translation */}
                {result.matched.length > 0 && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + result.matched.length * 0.06, duration: 0.5, ease: EASE }}
                    className="mt-8 rounded-2xl border border-[rgba(211,253,80,0.4)] bg-[rgba(211,253,80,0.06)] p-6 md:p-8"
                  >
                    <div className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-lime">
                      Human translation
                    </div>
                    <p className="font-display mt-3 text-2xl font-semibold leading-snug md:text-4xl">
                      {result.humanTranslation}
                    </p>
                    {result.coverage < 1 && result.coverage > 0 && (
                      <p className="font-mono2 mt-3 text-xs text-faint">
                        understood {Math.round(result.coverage * 100)}% of the message — the rest is beyond science
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
