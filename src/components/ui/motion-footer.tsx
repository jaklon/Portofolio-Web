// Adapted from the user's supplied CinematicFooter / motion-footer.tsx prompt.
import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Heart, Link2, Mail } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { cn } from '../../lib/utils'
import '../../MotionFooter.css'

type MagneticButtonProps = (
  | ({ as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
) & { reducedMotion?: boolean }

export function MagneticButton(props: MagneticButtonProps) {
  const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const reduced = props.reducedMotion

  useEffect(() => {
    const target = elementRef.current
    if (!target || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const element: HTMLElement = target
    let bounds = element.getBoundingClientRect()
    const enter = () => { bounds = element.getBoundingClientRect() }
    const reset = () => {
      gsap.to(element, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' })
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || document.activeElement === element) return
      const x = event.clientX - bounds.left - bounds.width / 2
      const y = event.clientY - bounds.top - bounds.height / 2
      gsap.to(element, { x: Math.max(-12, Math.min(12, x * 0.2)), y: Math.max(-8, Math.min(8, y * 0.2)), rotationX: -y * 0.08, rotationY: x * 0.08, scale: 1.03, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    }
    element.addEventListener('pointerenter', enter)
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('focus', reset)
    return () => {
      element.removeEventListener('pointerenter', enter)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('focus', reset)
      gsap.killTweensOf(element)
      gsap.set(element, { clearProps: 'transform' })
    }
  }, [reduced])

  if (props.as === 'a') {
    const { as: _as, reducedMotion: _reduced, className, ...attributes } = props
    return <a ref={elementRef as React.RefObject<HTMLAnchorElement | null>} className={cn('footer-glass-pill', className)} {...attributes} />
  }
  const { as: _as, reducedMotion: _reduced, className, ...attributes } = props
  return <button ref={elementRef as React.RefObject<HTMLButtonElement | null>} type="button" className={cn('footer-glass-pill', className)} {...attributes} />
}

const marqueeItems = ['A project. A role. An idea.', 'Web experiences', 'AI integration', 'Security thinking', 'Let’s connect']

function MarqueeItem() {
  return <div className="cinematic-footer__marquee-group">{marqueeItems.map(text => <span key={text}>{text}<i>✦</i></span>)}</div>
}

export interface CinematicFooterProps {
  email: string
  linkedin: string
  routeKey?: string
}

export function CinematicFooter({ email, linkedin, routeKey }: CinematicFooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const giantTextRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const reduced = !!useReducedMotion()
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const live = useRef(true)

  useEffect(() => {
    live.current = true
    return () => { live.current = false; if (copyTimer.current) clearTimeout(copyTimer.current) }
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    let visible = typeof IntersectionObserver === 'undefined'
    const updateVisibility = () => wrapper.classList.toggle('is-visible', visible && !document.hidden)
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; updateVisibility() })
    observer?.observe(wrapper)
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => { observer?.disconnect(); document.removeEventListener('visibilitychange', updateVisibility) }
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || reduced) return
    let alive = true
    let refreshFrame = 0
    const context = gsap.context(() => {
      gsap.fromTo(giantTextRef.current, { y: '7vh', scale: 0.9, opacity: 0.25 }, {
        y: 0, scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: wrapper, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
      })
      gsap.fromTo([headingRef.current, linksRef.current], { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: wrapper, start: 'top 75%', once: true },
      })
    }, wrapper)
    const refresh = () => {
      cancelAnimationFrame(refreshFrame)
      refreshFrame = requestAnimationFrame(() => { if (alive) ScrollTrigger.refresh() })
    }
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(refresh)
    if (wrapper.parentElement) resizeObserver?.observe(wrapper.parentElement)
    document.fonts?.ready.then(() => { if (alive) refresh() })
    refresh()
    return () => { alive = false; cancelAnimationFrame(refreshFrame); resizeObserver?.disconnect(); context.revert() }
  }, [reduced, routeKey])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      if (!live.current) return
      setCopyStatus('copied')
    } catch {
      if (!live.current) return
      setCopyStatus('failed')
    }
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopyStatus('idle'), 3500)
  }

  return (
    <div ref={wrapperRef} id="contact" className="cinematic-footer-reveal" onFocusCapture={() => {
      // Fixed curtain contents need their wrapper revealed when reached by keyboard.
      if ((wrapperRef.current?.getBoundingClientRect().top ?? 0) > 120) wrapperRef.current?.scrollIntoView({ block: 'end', behavior: 'instant' })
    }}>
      <footer className="cinematic-footer" aria-labelledby="footer-title">
        <div className="footer-aurora" aria-hidden="true" />
        <div className="footer-bg-grid" aria-hidden="true" />
        <div ref={giantTextRef} className="footer-giant-bg-text" aria-hidden="true">JASCON</div>

        <div className="cinematic-footer__marquee" aria-hidden="true"><div className="cinematic-footer__marquee-track"><MarqueeItem /><MarqueeItem /></div></div>

        <div className="cinematic-footer__main">
          <p className="cinematic-footer__eyebrow">ONE MESSAGE CAN START SOMETHING GOOD</p>
          <h2 ref={headingRef} id="footer-title" className="footer-text-glow">Have an idea?{' '}<br />Let’s talk.</h2>
          <p className="cinematic-footer__intro">A project, a role, or a curious thought.<br />I’d love to hear what you have in mind.</p>
          <div ref={linksRef} className="cinematic-footer__links">
            <div className="cinematic-footer__primary">
              <MagneticButton as="a" href={`mailto:${email}`} className="cinematic-footer__cta cinematic-footer__cta--email" reducedMotion={reduced}><Mail size={21} aria-hidden="true" /><span>Email Jascon</span><ArrowUpRight size={19} aria-hidden="true" /></MagneticButton>
              <MagneticButton as="a" href={linkedin} target="_blank" rel="noopener noreferrer" className="cinematic-footer__cta" reducedMotion={reduced}><Link2 size={20} aria-hidden="true" /><span>Connect on LinkedIn</span><ArrowUpRight size={19} aria-hidden="true" /></MagneticButton>
            </div>
            <div className="cinematic-footer__email-row"><a href={`mailto:${email}`}>{email}</a><MagneticButton onClick={copyEmail} aria-label={copyStatus === 'copied' ? 'Email copied' : 'Copy email address'} className="cinematic-footer__copy" reducedMotion={reduced}>{copyStatus === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}</MagneticButton></div>
            <p className="cinematic-footer__copy-status" role="status">{copyStatus === 'copied' ? 'Email copied. Ready when you are.' : copyStatus === 'failed' ? 'You can select the email above to copy it, or use Email Jascon.' : '\u00a0'}</p>
          </div>
        </div>

        <div className="cinematic-footer__bottom">
          <span className="cinematic-footer__copyright">© {new Date().getFullYear()} Jascon Kembuan</span>
          <div className="footer-glass-pill cinematic-footer__credit"><span>Built with curiosity</span><Heart size={14} aria-hidden="true" /><span>& care</span></div>
          <MagneticButton as="a" href="#main-content" className="cinematic-footer__top" aria-label="Back to top" reducedMotion={reduced}><ArrowUp size={20} aria-hidden="true" /></MagneticButton>
        </div>
      </footer>
    </div>
  )
}
