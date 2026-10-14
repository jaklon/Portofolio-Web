import { ArrowUpRight, BadgeCheck, GraduationCap, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { achievements, education, experiences, projects } from '../data/portfolio'
import { toolkit } from '../data/toolkit'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageTransition } from '../components/PageTransition'
import { HeroScene } from '../components/HeroScene'

export function AboutPage() {
  usePageTitle('About')
  const current = experiences[0]
  const study = education[0]
  const certification = achievements[0]

  return (
    <PageTransition>
      <main id="main-content" className="page-shell page-width about-page studio-page">
        <section className="about-profile" aria-labelledby="about-title">
          <div className="about-profile__copy">
            <p className="eyebrow"><span className="status-dot" /> THE PERSON BEHIND THE CODE</p>
            <h1 id="about-title">A curious mind.<br /><span>A builder at heart.</span></h1>
            <p className="about-profile__intro">I'm Jascon Johanest Kembuan. I build for the web, explore applied AI, and learn how to make digital experiences more secure.</p>
            <p className="about-profile__story">From a first sketch to a working website, I enjoy connecting the details: the interface, the system, and the delivery. My perspective comes from Informatics Engineering, client projects, and hands-on experience in security operations.</p>
            <div className="about-profile__actions">
              <Link className="button button--glass" to="/projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="about-profile__contact" href="#contact">Let's connect <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>

          <div className="about-profile__portrait"><HeroScene context="about" /></div>

          <dl className="about-profile__facts">
            <div><dt><ShieldCheck size={20} aria-hidden="true" /> CURRENT CHAPTER</dt><dd><strong>{current.role}</strong><span>{current.company}</span><small>{current.period}</small></dd></div>
            <div><dt><GraduationCap size={20} aria-hidden="true" /> THE FOUNDATION</dt><dd><strong>{study.institution}</strong><span>{study.program}</span><small>{study.period}</small></dd></div>
            <div><dt><BadgeCheck size={20} aria-hidden="true" /> A RECENT MILESTONE</dt><dd><strong>{certification.title}</strong><span>{certification.issuer}</span><small>{certification.date}</small></dd></div>
          </dl>

          <dl className="about-profile__numbers">
            <div><dt>Client websites</dt><dd>{String(projects.filter(project => project.category === 'freelance').length).padStart(2, '0')}</dd></div>
            <div><dt>Projects & case studies</dt><dd>{String(projects.length).padStart(2, '0')}</dd></div>
            <div><dt>Tools & technologies</dt><dd>{toolkit.length}</dd></div>
          </dl>
        </section>
      </main>
    </PageTransition>
  )
}
