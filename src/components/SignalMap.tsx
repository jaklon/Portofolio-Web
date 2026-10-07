import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { gsap, useGSAP } from '../lib/gsap'

const domains = [
  { label: 'WEB', detail: 'Interfaces + delivery', x: 18, y: 24 },
  { label: 'AI', detail: 'RAG + language systems', x: 78, y: 20 },
  { label: 'SEC', detail: 'Security-minded tools', x: 70, y: 78 },
]

export function SignalMap() {
  const root = useRef<HTMLDivElement>(null)
  const pulseOne = useRef<SVGPathElement>(null)
  const pulseTwo = useRef<SVGPathElement>(null)
  const core = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (shouldReduceMotion) return

      gsap.to(pulseOne.current, { strokeDashoffset: -72, duration: 5.5, ease: 'none', repeat: -1 })
      gsap.to(pulseTwo.current, { strokeDashoffset: -52, duration: 4.2, ease: 'none', repeat: -1 })
      gsap.to(core.current, {
        boxShadow: '0 0 0 1.3rem rgba(85,230,255,.04), 0 0 5rem rgba(85,230,255,.22)',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: root, dependencies: [shouldReduceMotion] },
  )

  return (
    <div ref={root} className="signal-map" aria-label="Connected Web, AI, and Security practice map">
      <div className="signal-map__grid" aria-hidden="true" />
      <svg className="signal-map__lines" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M18 24 L50 50 L78 20" />
        <path d="M50 50 L70 78" />
        <path ref={pulseOne} className="signal-map__pulse" d="M18 24 L50 50 L78 20" />
        <path ref={pulseTwo} className="signal-map__pulse signal-map__pulse--two" d="M50 50 L70 78" />
      </svg>

      <div ref={core} className="signal-map__core">
        <span>JJK</span>
        <small>BUILD NODE</small>
      </div>

      {domains.map((domain) => (
        <motion.div
          className="signal-node"
          key={domain.label}
          style={{ left: `${domain.x}%`, top: `${domain.y}%`, x: '-50%', y: '-50%' }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
        >
          <span>{domain.label}</span>
          <small>{domain.detail}</small>
        </motion.div>
      ))}

      <span className="signal-map__coordinate signal-map__coordinate--top">INDONESIA / REMOTE</span>
      <span className="signal-map__coordinate signal-map__coordinate--bottom">SIGNAL / 03 ACTIVE</span>
    </div>
  )
}
