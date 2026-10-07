import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

export function TextRewind({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.8 })
  const reducedMotion = useReducedMotion()
  return (
    <span ref={ref} className="text-rewind">
      {!reducedMotion && [1, 2].map(layer => <motion.span key={layer} aria-hidden="true" className="text-rewind__echo" initial={{ opacity: 0 }} animate={visible ? { y: [12 * layer, 0], opacity: [0.4, 0] } : { opacity: 0 }} transition={{ duration: 0.7, delay: 0.12 * layer }}>{text}</motion.span>)}
      <span>{text}</span>
    </span>
  )
}
