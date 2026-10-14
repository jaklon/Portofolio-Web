import { useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, BrainCircuit, Code2, Plus, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { achievements, experiences } from '../data/portfolio'
import { usePageTitle } from '../hooks/usePageTitle'
import { HeroScene } from '../components/HeroScene'
import { PageTransition } from '../components/PageTransition'
import { WorkGallery } from '../components/WorkGallery'
import { ToolkitSphere } from '../components/ToolkitSphere'
import { GlowCard } from '../components/ui/spotlight-card'
import { TextRewind } from '../components/ui/text-rewind'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { HeroCarousel } from '../components/ui/hero-carousel'
import { useHomeBackground } from '../hooks/useHomeBackground'
import { homeWallpapers } from '../data/home-wallpapers'

const practice = [
  { icon: Code2, index: '01', title: 'Web that works.', category: 'WEB PRODUCTS', copy: 'Thoughtful interfaces, useful integrations, and the details that get a website from local build to live.', tags: ['React', 'TypeScript', 'Full delivery'], className: 'practice-card--web', glowColor: 'blue' },
  { icon: BrainCircuit, index: '02', title: 'Ideas with intelligence.', category: 'AI & RETRIEVAL', copy: 'Language models connected to the right information. Bringing conversational experiences into real systems.', tags: ['LLM integration', 'RAG', 'Python'], className: 'practice-card--ai', glowColor: 'purple' },
  { icon: ShieldCheck, index: '03', title: 'A security perspective.', category: 'SECURITY THINKING', copy: 'Learning to build with care through internal tooling, risk analysis, and security-awareness work.', tags: ['Security operations', 'Risk analysis'], className: 'practice-card--security', glowColor: 'green' },
] as const

function HeroWord() {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [word, setWord] = useState(0)
  const words = ['real world.', 'people.', 'possibilities.']
  return <motion.span ref={ref} className={`hero-word ${word === 2 ? 'hero-word--long' : ''}`} initial={reduced ? false : { opacity: 0, y: 18 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ duration: 0.65, delay: 0.25 }}><span>{words[word]}</span><button type="button" className="hero-word__switch" aria-label="Explore another headline" onClick={() => setWord(index => (index + 1) % words.length)}><Plus size={20} aria-hidden="true" /></button></motion.span>
}

export function HomePage() {
  usePageTitle()
  const background = useHomeBackground()
  return (
    <PageTransition>
      <main id="main-content" className="home-page">
        <section className="studio-hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPER · INDONESIA</p>
            <h1 id="hero-title">Ideas, built<br />for the<br /><HeroWord /></h1>
            <p className="hero-description">I'm Jascon. I bring together thoughtful web experiences, AI integration, and a security-minded approach to building software.</p>
            <div className="hero-actions"><Link className="button button--primary" to="/projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></Link><a className="button button--glass" href="#contact">Let's talk <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            <div className="hero-footnote"><span className="mini-avatar" aria-hidden="true">j.</span><div><strong>A builder. A learner. A curious mind.</strong><span>Web products / AI systems / Security</span></div></div>
          </div>
          <HeroScene />
          <div className="hero-bottom"><a href="#selected-work"><ArrowDown size={16} aria-hidden="true" /> Scroll to discover</a><a href="#home-atmosphere">Change background <ArrowDown size={14} aria-hidden="true" /></a><span>PORTFOLIO / 2026</span></div>
        </section>

        <section id="home-atmosphere" className="home-scene-picker page-width" aria-label="Choose your atmosphere">
          <div className="home-scene-picker__intro"><p className="eyebrow">A CHANGE OF SCENE</p><p>Same curious mind.<br /><strong>A different atmosphere.</strong></p><span>Your choice follows you on every page.</span></div>
          <HeroCarousel items={homeWallpapers} index={background.index} onIndexChange={background.select} compact showBackground={false} label="Choose the website background" brand="SET THE SCENE" className="home-scene-picker__carousel" />
        </section>

        <div className="practice-strip" aria-label="Areas of practice"><div className="page-width"><span>WEB DEVELOPMENT</span><Plus size={17} aria-hidden="true" /><span>AI INTEGRATION</span><Plus size={17} aria-hidden="true" /><span>SECURITY THINKING</span><Plus size={17} aria-hidden="true" /><span>FROM IDEA TO DELIVERY</span></div></div>

        <section className="selected-work page-width section-space" id="selected-work" aria-labelledby="work-title">
          <div className="editorial-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">A few things I've<br /><TextRewind text="brought to life." /></h2></div><div className="editorial-heading__aside"><p>Client websites, intelligent systems, and a growing security perspective. Each project adds something to the way I build.</p><Link className="text-link" to="/projects">Explore all projects <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
          <WorkGallery />
        </section>

        <section className="practice-section page-width section-space" aria-labelledby="practice-title">
          <div className="editorial-heading"><div><p className="eyebrow">02 / WHAT I BRING</p><h2 id="practice-title">Different disciplines.<br /><span className="muted-heading">One curious mind.</span></h2></div><p className="editorial-heading__aside">I like the space between a good interface, a useful system, and the practical decisions that make it work.</p></div>
          <div className="practice-grid">{practice.map(item => <GlowCard key={item.index} customSize glowColor={item.glowColor} className={`practice-card ${item.className}`}><div className="practice-card__top"><item.icon size={26} strokeWidth={1.5} aria-hidden="true" /><span>{item.index}</span></div><span className="practice-card__category">{item.category}</span><h3>{item.title}</h3><p>{item.copy}</p><div className="practice-card__tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></GlowCard>)}</div>
        </section>

        <section className="about-preview page-width section-space" aria-labelledby="about-preview-title">
          <ToolkitSphere />
          <div className="about-preview__copy"><p className="eyebrow">03 / A LITTLE ABOUT ME</p><h2 id="about-preview-title">Still learning.<br />Already building.</h2><p>I'm Jascon Johanest Kembuan, an Informatics Engineering student who enjoys taking ideas all the way to delivery. My work moves between freelance websites, applied AI, and an ongoing CISO internship.</p><div className="about-preview__facts"><span><strong>04</strong>Freelance engagements</span><span><strong>05</strong>People led in an AI project</span></div><Link className="text-link" to="/about">Meet the person behind the work <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        </section>

        <section className="current-note page-width" aria-label="Current experience and credential"><div><span className="status-dot" /><div><span className="eyebrow">CURRENT CHAPTER</span><p>{experiences[0].role} <span>at {experiences[0].company}</span></p></div></div><div><ShieldCheck size={20} aria-hidden="true" /><div><span className="eyebrow">ALWAYS LEARNING</span><p>{achievements[0].title}</p></div></div></section>
      </main>
    </PageTransition>
  )
}
