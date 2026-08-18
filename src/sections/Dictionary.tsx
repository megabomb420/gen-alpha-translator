import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  DICTIONARY,
  CATEGORIES,
  CATEGORY_LABEL,
  BRAINROT_LABELS,
  SAFETY_META,
  type CategoryId,
  type SlangEntry,
} from '../data/dictionary'
import { SectionHead, BrainrotDots, SafetyMark } from '../components/ui-kit'
import { cn } from '../lib/utils'

const EASE = [0.16, 1, 0.3, 1] as const

function EntryCard({
  entry,
  open,
  onToggle,
}: {
  entry: SlangEntry
  open: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  const isEmoji = /\p{Extended_Pictographic}/u.test(entry.term)
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(open && 'md:col-span-2')}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          'glass group flex h-full w-full flex-col rounded-2xl p-5 text-left transition-colors duration-300 hover:border-[rgba(211,253,80,0.35)] md:p-6',
          open && 'border-[rgba(211,253,80,0.4)] bg-[rgba(211,253,80,0.04)]',
        )}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <span
            className={cn(
              'font-display font-extrabold uppercase leading-none tracking-tight',
              isEmoji ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl',
              open ? 'text-lime' : 'text-ink group-hover:text-lime',
              'transition-colors duration-300',
            )}
          >
            {entry.term}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-1 shrink-0 text-xl text-faint group-hover:text-lime"
          >
            +
          </motion.span>
        </div>
        {entry.expansion && (
          <div className="font-mono2 mt-1.5 text-[10px] uppercase tracking-wider text-faint">{entry.expansion}</div>
        )}
        <div className="mt-2 text-sm text-dim">“{entry.pl}”</div>

        <div className="mt-auto flex w-full flex-wrap items-center gap-x-4 gap-y-2 pt-4">
          <BrainrotDots level={entry.brainrot} />
          <SafetyMark safety={entry.safety} />
          <span className="font-mono2 text-[9px] uppercase tracking-wider text-faint">
            {CATEGORY_LABEL[entry.category]}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-t border-line pt-5">
                <p className="text-sm leading-relaxed text-ink md:text-base">{entry.meaning}</p>
                <div className="rounded-xl bg-black/30 p-4">
                  <div className="font-mono2 text-[10px] uppercase tracking-widest text-faint">example</div>
                  <div className="font-mono2 mt-1 text-sm text-dim">{entry.example}</div>
                  <div className="mt-3 border-l-2 pl-3 text-sm text-ink" style={{ borderColor: 'var(--lime)' }}>
                    <span className="font-mono2 text-[10px] uppercase tracking-widest text-lime">
                      parent translation{' '}
                    </span>
                    <br />
                    {entry.parent}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono2 text-[10px] text-faint">
                    brainrot level {entry.brainrot}/5 — {BRAINROT_LABELS[entry.brainrot]}
                  </span>
                  <span
                    className={cn(
                      'font-mono2 text-[10px] uppercase tracking-wider',
                      entry.safety === 'safe' && 'text-lime',
                      entry.safety === 'caution' && 'text-amber2',
                      entry.safety === 'dont' && 'text-red2',
                    )}
                  >
                    {SAFETY_META[entry.safety].dot} {SAFETY_META[entry.safety].label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

export default function Dictionary() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [openTerm, setOpenTerm] = useState<string | null>(null)
  const reduce = useReducedMotion()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DICTIONARY.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false
      if (!q) return true
      return [e.term, e.expansion ?? '', e.pl, e.meaning, e.example, e.parent]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [query, cat])

  const counts = useMemo(() => {
    const m = new Map<CategoryId, number>()
    for (const e of filtered) m.set(e.category, (m.get(e.category) ?? 0) + 1)
    return m
  }, [filtered])

  return (
    <section id="dictionary" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="03"
          kicker="The dictionary"
          title={
            <>
              Every word. <span className="text-lime">Decoded.</span>
            </>
          }
          sub={`${DICTIONARY.length} entries. Click any card to see what your child actually meant. Understanding is safe. Speaking is not.`}
        />

        {/* sticky search + filters */}
        <div className="sticky top-16 z-30 -mx-2 rounded-2xl border border-line bg-[rgba(7,7,8,0.85)] p-3 backdrop-blur-xl md:top-20 md:p-4">
          <div className="flex items-center gap-3 rounded-xl bg-black/50 px-4 py-3">
            <span aria-hidden className="text-lime">⌕</span>
            <label htmlFor="dict-search" className="sr-only">
              Search the dictionary
            </label>
            <input
              id="dict-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What the hell does ___ mean?"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-transparent font-mono2 text-base text-ink placeholder:text-faint focus:outline-none md:text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="font-mono2 text-xs uppercase text-faint hover:text-lime"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Category filters">
            <button
              onClick={() => setCat('all')}
              className={cn(
                'rounded-full border px-4 py-2 font-mono2 text-[11px] uppercase tracking-wider transition-colors',
                cat === 'all' ? 'border-transparent bg-lime text-black' : 'border-line text-dim hover:text-lime',
              )}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(cat === c.id ? 'all' : c.id)}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono2 text-[11px] uppercase tracking-wider transition-colors',
                  cat === c.id ? 'border-transparent bg-lime text-black' : 'border-line text-dim hover:text-lime',
                )}
              >
                {c.label}
                {cat === c.id && counts.get(c.id) ? ` (${counts.get(c.id)})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* results */}
        <div className="mt-8">
          <div className="font-mono2 mb-4 text-[11px] uppercase tracking-[0.25em] text-faint" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            {query && (
              <>
                {' '}
                for <span className="text-lime">“{query}”</span>
              </>
            )}
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-10 text-center"
            >
              <div className="text-5xl">💀</div>
              <p className="font-display mt-4 text-2xl font-bold">No match. You're cooked.</p>
              <p className="mt-2 text-sm text-dim">
                Either your child invented a new word 12 minutes ago, or try a different spelling.
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((e) => (
                  <EntryCard
                    key={e.term}
                    entry={e}
                    open={openTerm === e.term}
                    onToggle={() => setOpenTerm(openTerm === e.term ? null : e.term)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* brainrot legend */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-line bg-white/[0.02] p-6">
          <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-faint">Brainrot scale</span>
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <span key={n} className="flex items-center gap-2 text-xs text-dim">
              <BrainrotDots level={n} />
              <span className="font-mono2">
                {n} — {BRAINROT_LABELS[n]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
