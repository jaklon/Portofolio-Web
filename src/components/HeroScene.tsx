import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { MoveUpRight, Pause, Play, RotateCcw, UserRound } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import { Card } from './ui/card'
import { hero3D } from '../data/hero'
import '../AvatarScene.css'

const AvatarScene = lazy(() => import('./AvatarScene'))

export function HeroScene({ context = 'home' }: { context?: 'home' | 'about' }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const [motionChoice, setMotionChoice] = useState<boolean | null>(null)
  const active = motionChoice ?? !reducedMotion
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(true)
  const [started, setStarted] = useState(() => typeof IntersectionObserver === 'undefined')
  const [attempt, setAttempt] = useState(0)
  const onLoad = useCallback(() => setLoaded(true), [])
  const onFailure = useCallback(() => { setFailed(true); setLoaded(false) }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
      if (entry.isIntersecting) setStarted(true)
    }, { rootMargin: '80px' })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const retry = () => { setFailed(false); setLoaded(false); setAttempt(value => value + 1) }

  return (
    <Card ref={stageRef} className={`hero-scene hero-scene--avatar ${loaded ? 'is-loaded' : ''}`} aria-label="Jascon's interactive 3D avatar">
      <div className="hero-scene__header">
        <span className="hero-scene__intro"><i aria-hidden="true" /> MEET THE MAKER</span>
        <button className="hero-scene__motion" type="button" onClick={() => setMotionChoice(!active)} disabled={!loaded} aria-label={active ? 'Pause avatar movement' : 'Enable avatar movement'} aria-pressed={active}>{active ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>
      </div>
      <div className="hero-scene__art" role="img" aria-label="3D portrait of Jascon Kembuan; his head and body follow the cursor">
        <div className="hero-scene__portrait-frame" aria-hidden="true" />
        <div className="hero-scene__avatar-halo" aria-hidden="true" />
        <div className="hero-scene__portrait-floor" aria-hidden="true" />
        {started && !failed && <Suspense fallback={null}><AvatarScene key={attempt} url={hero3D.modelUrl} active={active} visible={inView} onLoad={onLoad} onFailure={onFailure} /></Suspense>}
        {!loaded && <div className="hero-scene__avatar-placeholder"><UserRound size={46} strokeWidth={1} aria-hidden="true" /><span role="status">{failed ? "The avatar couldn't load." : 'Loading my 3D self…'}</span>{failed && <button type="button" onClick={retry}>Try again <RotateCcw size={13} aria-hidden="true" /></button>}</div>}
      </div>
      <div className="hero-scene__identity">
        <div><h2>Jascon <span>Kembuan.</span></h2><p>WEB / AI / SECURITY</p></div>
        {context === 'about'
          ? <a href="#contact" className="hero-scene__profile-link" aria-label="Contact Jascon Kembuan"><MoveUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></a>
          : <Link to="/about" className="hero-scene__profile-link" aria-label="More about Jascon Kembuan"><MoveUpRight size={21} strokeWidth={1.5} aria-hidden="true" /></Link>}
      </div>
      <span className="hero-scene__note">{loaded ? (active ? 'Move your cursor. Say hello.' : 'Taking a little pause.') : (failed ? 'Try reloading the portrait.' : 'Getting ready to say hello.')}</span>
    </Card>
  )
}
