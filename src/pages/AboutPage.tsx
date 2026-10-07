import { ArrowUpRight, BookOpen, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { achievements, education, experiences, skillGroups } from '../data/portfolio'
import { usePageTitle } from '../hooks/usePageTitle'
import { PageTransition } from '../components/PageTransition'
import { SectionHeading } from '../components/SectionHeading'
import { Journey } from '../components/Journey'
import { SpotlightCard } from '../components/ui/spotlight-card'

export function AboutPage() {
  usePageTitle('About')
  return (
    <PageTransition>
      <main id="main-content" className="page-shell page-width about-page">
        <header className="page-hero page-hero--about"><p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p><h1>A curious mind.<br />A <em>builder at heart.</em></h1><div className="page-hero__foot"><p>I'm Jascon Johanest Kembuan. I study Informatics Engineering, build websites for clients, explore applied AI, and learn from the real constraints of security work.</p><Link className="button button--primary" to="/projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></Link></div></header>
        <section className="about-bento" aria-label="Profile overview"><SpotlightCard className="bento-card bento-card--statement"><Sparkles size={30} strokeWidth={1.5} aria-hidden="true" /><p>I enjoy the whole journey:<br /><span>the idea, the interface,<br />the system, the delivery.</span></p><span className="eyebrow">CURIOUS ABOUT HOW THINGS CONNECT</span></SpotlightCard><article className="bento-card bento-card--now"><ShieldCheck size={28} strokeWidth={1.5} aria-hidden="true" /><span className="eyebrow">CURRENT CHAPTER</span><h2>CISO Intern</h2><p>PT Mandiri Sekuritas</p><small>Jul 2026 — Present</small></article><article className="bento-card bento-card--education"><GraduationCap size={28} strokeWidth={1.5} aria-hidden="true" /><span className="eyebrow">BUILDING THE FOUNDATION</span><h2>Informatics<br />Engineering</h2><p>Politeknik Negeri Jakarta</p><small>Semester 7</small></article></section>
        <section className="section-space" aria-labelledby="journey-title"><SectionHeading id="journey-title" index="01" eyebrow="The journey" title="Every chapter adds a perspective." copy="From a project-based foundation to client work and security. Pick a milestone to explore." /><Journey /></section>
        <section className="timeline-section section-space" aria-labelledby="experience-title"><SectionHeading id="experience-title" index="02" eyebrow="Experience" title="Learning through real work." /><div className="timeline-list">{experiences.map((experience, index) => <article className="timeline-item" key={`${experience.company}-${experience.period}`}><span className="timeline-item__index">{String(index + 1).padStart(2, '0')}</span><div className="timeline-item__main"><p>{experience.company}</p><h3>{experience.role}</h3><small>{experience.summary}</small></div><div className="timeline-item__meta"><span>{experience.period}</span><span>{experience.mode}</span></div></article>)}</div></section>
        <section className="education-section section-space" aria-labelledby="education-title"><SectionHeading id="education-title" index="03" eyebrow="Education" title="A project-based foundation." /><div className="education-grid">{education.map(item => <article className="education-card" key={item.institution}><div><BookOpen size={23} strokeWidth={1.5} aria-hidden="true" /><span>{item.period}</span></div><h3>{item.institution}</h3><p>{item.program}</p><small>{item.summary}</small></article>)}</div></section>
        <section className="skills-section section-space" aria-labelledby="skills-title"><SectionHeading id="skills-title" index="04" eyebrow="The toolkit" title="The tools behind the ideas." copy="Technologies I have worked with, grouped by the problems they help solve." /><div className="skill-groups">{skillGroups.map(group => <article className="skill-group" key={group.label}><h3>{group.label}</h3><div className="tag-list tag-list--large">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>
        <section className="achievements-section section-space" aria-labelledby="achievement-title"><SectionHeading id="achievement-title" index="05" eyebrow="Along the way" title="Milestones worth keeping." /><div className="achievement-list">{achievements.map((achievement, index) => <article key={achievement.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{achievement.title}</h3><p>{achievement.issuer}</p><time>{achievement.date}</time></article>)}</div></section>
      </main>
    </PageTransition>
  )
}
