// Adapted from ibelick's Spotlight supplied by the user, with paired event cleanup.
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useSpring, useTransform, type SpringOptions } from 'motion/react'
import { cn } from '@/lib/utils'

interface SpotlightProps {
  className?: string
  size?: number
  springOptions?: SpringOptions
}

export function Spotlight({ className, size = 260, springOptions = { bounce: 0 } }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const reducedMotion = useReducedMotion()
  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)
  const left = useTransform(mouseX, x => x - size / 2)
  const top = useTransform(mouseY, y => y - size / 2)

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent || reducedMotion) return
    const move = (event: PointerEvent) => {
      const bounds = parent.getBoundingClientRect()
      mouseX.set(event.clientX - bounds.left)
      mouseY.set(event.clientY - bounds.top)
    }
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerenter', enter)
    parent.addEventListener('pointerleave', leave)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerenter', enter)
      parent.removeEventListener('pointerleave', leave)
    }
  }, [mouseX, mouseY, reducedMotion])

  return <motion.div ref={ref} aria-hidden="true" className={cn('spotlight', className)} style={{ width: size, height: size, left, top, opacity: hovered ? 1 : 0 }} />
}
