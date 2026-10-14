// GlowCard adapts the user's supplied prompt; provenance is in docs/component-sources.md.
import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type PropsWithChildren, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Spotlight } from './spotlight'
import './spotlight-card.css'

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
}

export type GlowColor = keyof typeof glowColorMap

interface GlowCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  glowColor?: GlowColor
  size?: 'sm' | 'md' | 'lg'
  width?: string | number
  height?: string | number
  customSize?: boolean
}

export function GlowCard({ children, className, glowColor = 'blue', size = 'md', width, height, customSize = false, style, ...props }: GlowCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let frame = 0
    let pointer: { x: number; y: number } | null = null

    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      pointer = null
      card.style.setProperty('--glow-opacity', '0')
    }
    const syncPointer = () => {
      frame = 0
      if (!pointer) return
      const bounds = card.getBoundingClientRect()
      const { x, y } = pointer
      const nearby = bounds.bottom > 0 && bounds.top < window.innerHeight && x > bounds.left - 200 && x < bounds.right + 200 && y > bounds.top - 200 && y < bounds.bottom + 200
      card.style.setProperty('--glow-opacity', nearby ? '1' : '0')
      if (!nearby) return
      // Card-relative coordinates keep the highlight aligned while the page scrolls.
      card.style.setProperty('--glow-x', `${(x - bounds.left).toFixed(2)}px`)
      card.style.setProperty('--glow-y', `${(y - bounds.top).toFixed(2)}px`)
      card.style.setProperty('--xp', (x / Math.max(window.innerWidth, 1)).toFixed(3))
    }
    const schedule = () => {
      if (!frame && pointer) frame = requestAnimationFrame(syncPointer)
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    const stop = () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('blur', reset)
      reset()
    }
    const configure = () => {
      stop()
      if (!preference.matches) return
      document.addEventListener('pointermove', move, { passive: true })
      document.addEventListener('pointerleave', reset)
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule, { passive: true })
      window.addEventListener('blur', reset)
    }
    configure()
    preference.addEventListener('change', configure)
    return () => {
      preference.removeEventListener('change', configure)
      stop()
    }
  }, [])

  const { base, spread } = glowColorMap[glowColor]
  const cardStyle: CSSProperties & Record<`--${string}`, string | number> = {
    '--base': base,
    '--spread': spread,
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return <article {...props} ref={cardRef} data-glow style={cardStyle} className={cn('glow-card', !customSize && `glow-card--${size}`, className)}>
    <div className="glow-card__halo" aria-hidden="true" />
    <div className="glow-card__content">{children}</div>
  </article>
}

export function SpotlightCard({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={cn('spotlight-card', className)}><Spotlight /><div className="spotlight-card__content">{children}</div></article>
}
