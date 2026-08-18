import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { NAV_LINKS } from '../data/content'
import { cn } from '../lib/utils'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={reduce ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-line bg-[rgba(7,7,8,0.8)] backdrop-blur-xl' : 'bg-transparent',
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-12">
        <a href="#top" className="font-display text-lg font-extrabold uppercase tracking-tight md:text-xl">
          BRO <span aria-hidden>😭</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono2 text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-ink"
            >
              {l.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full"
              />
            </a>
          ))}
        </div>
        <a
          href="#dictionary"
          className="rounded-full border border-line px-4 py-2 font-mono2 text-[11px] uppercase tracking-widest text-dim transition-colors hover:border-[rgba(211,253,80,0.6)] hover:text-lime md:hidden"
        >
          Search ⌕
        </a>
        <span className="font-mono2 hidden items-center gap-2 text-[10px] uppercase tracking-widest text-faint md:flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime animate-pulse-glow" aria-hidden />
          aura: unstable
        </span>
      </div>
    </motion.nav>
  )
}
