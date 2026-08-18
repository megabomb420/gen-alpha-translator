import { useRef, type ReactNode, type CSSProperties } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../lib/utils'
import type { Safety } from '../data/dictionary'

/* Scroll reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Magnetic button wrapper */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 })

  if (reduce) return <div className="inline-block">{children}</div>

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* Infinite marquee strip */
export function Marquee({
  items,
  className,
  slow = false,
  separator = '✦',
}: {
  items: string[]
  className?: string
  slow?: boolean
  separator?: string
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span>{it}</span>
          <span className="text-lime" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={cn('relative flex overflow-hidden select-none', className)} aria-hidden>
      <div className={cn('flex', slow ? 'animate-marquee-slow' : 'animate-marquee')}>
        {row}
        {row}
      </div>
    </div>
  )
}

/* Section heading kit */
export function SectionHead({
  index,
  kicker,
  title,
  sub,
  align = 'left',
}: {
  index: string
  kicker: string
  title: ReactNode
  sub?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('mb-10 md:mb-16', align === 'center' && 'text-center')}>
      <Reveal>
        <div className={cn('flex items-baseline gap-3', align === 'center' && 'justify-center')}>
          <span className="font-mono2 text-xs text-lime">{index}</span>
          <span className="font-mono2 text-xs uppercase tracking-[0.25em] text-dim">{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-[clamp(2.2rem,6.5vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={cn('mt-5 max-w-xl text-base md:text-lg text-dim', align === 'center' && 'mx-auto')}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/* Brainrot level dots */
export function BrainrotDots({ level, size = 'sm' }: { level: number; size?: 'sm' | 'md' }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1', size === 'md' ? 'text-base' : 'text-[11px]')}
      title={`Brainrot level ${level}/5`}
      aria-label={`Brainrot level ${level} of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'inline-block rounded-full',
            size === 'md' ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5',
            i < level ? 'bg-lime' : 'bg-white/15',
          )}
        />
      ))}
    </span>
  )
}

/* Safety indicator */
export function SafetyMark({ safety, withLabel = false }: { safety: Safety; withLabel?: boolean }) {
  const map: Record<Safety, { dot: string; cls: string; label: string }> = {
    safe: { dot: 'bg-lime', cls: 'text-lime', label: 'SAFE TO USE' },
    caution: { dot: 'bg-amber2', cls: 'text-amber2', label: "UNDERSTAND, DON'T SAY" },
    dont: { dot: 'bg-red2', cls: 'text-red2', label: "DAD, PLEASE DON'T" },
  }
  const m = map[safety]
  return (
    <span className={cn('inline-flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-wider', m.cls)}>
      <span className={cn('h-2 w-2 rounded-full', m.dot)} style={{ backgroundColor: `var(--${safety === 'safe' ? 'lime' : safety === 'caution' ? 'amber' : 'red'})` }} />
      {withLabel && m.label}
      <span className="sr-only">{m.label}</span>
    </span>
  )
}

/* Big pill button */
export function PillButton({
  children,
  onClick,
  variant = 'lime',
  className,
  type = 'button',
  style,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'lime' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  style?: CSSProperties
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono2 text-sm font-bold uppercase tracking-widest transition-all duration-300 active:scale-95',
        variant === 'lime'
          ? 'bg-lime text-black hover:glow-lime hover:brightness-110'
          : 'border border-line text-ink hover:border-[rgba(211,253,80,0.6)] hover:text-lime',
        className,
      )}
    >
      {children}
    </button>
  )
}
