import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

interface IntroStatementProps {
  children: string
}

export function IntroStatement({ children }: IntroStatementProps) {
  const root = useRef<HTMLHeadingElement>(null)
  const words = children.split(' ')

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.fromTo(
        '.intro-word',
        { color: 'rgba(244, 247, 248, 0.12)' },
        {
          color: 'rgba(244, 247, 248, 1)',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 78%',
            end: 'bottom 48%',
            scrub: 0.7,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <h2 ref={root} className="intro-statement">
      {words.map((word, index) => (
        <span className="intro-word" key={`${word}-${index}`}>
          {word}{' '}
        </span>
      ))}
    </h2>
  )
}
