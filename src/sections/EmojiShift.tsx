import { motion, useReducedMotion } from 'framer-motion'
import { EMOJI_CARDS } from '../data/content'
import { SectionHead } from '../components/ui-kit'

const EASE = [0.16, 1, 0.3, 1] as const

function EmojiCardItem({ card, index }: { card: (typeof EMOJI_CARDS)[number]; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: EASE }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="glass group relative overflow-hidden rounded-3xl p-8 md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(211,253,80,0.6), transparent 70%)' }}
      />

      <motion.div
        aria-hidden
        className="animate-float-slow select-none text-[7rem] leading-none md:text-[9rem]"
        style={reduce ? undefined : { animationDelay: `${index * 0.9}s` }}
      >
        {card.emoji}
      </motion.div>

      <div className="mt-8 space-y-6">
        <div>
          <div className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-faint">Literally</div>
          {/* strikes through on scroll */}
          <div className="relative mt-1 inline-block">
            <span className="font-display text-2xl font-semibold text-dim md:text-3xl">{card.literal}</span>
            <motion.span
              aria-hidden
              className="absolute left-0 top-1/2 h-[3px] w-full origin-left bg-red2"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              style={{ backgroundColor: 'var(--red)' }}
            />
          </div>
        </div>

        <div>
          <div className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-lime">In practice</div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="font-display mt-1 text-2xl font-semibold leading-snug md:text-3xl"
          >
            {card.actual}
          </motion.p>
        </div>

        <div className="rounded-2xl bg-black/30 p-5">
          <div className="font-mono2 text-sm text-dim">{card.example}</div>
          <div className="mt-2 border-l-2 pl-3 text-base text-ink" style={{ borderColor: 'var(--lime)' }}>
            {card.translation}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function EmojiShift() {
  return (
    <section id="emoji" className="relative scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          index="02"
          kicker="Reality check"
          title={
            <>
              Emoji are <span className="text-lime">not</span> emotions
            </>
          }
          sub="The emoji you know retired years ago. These are their replacements. Watch the old meanings die as you scroll."
        />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {EMOJI_CARDS.map((c, i) => (
            <EmojiCardItem key={c.emoji} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
