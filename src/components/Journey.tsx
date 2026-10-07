import { useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Code2, GraduationCap, ShieldCheck } from 'lucide-react'
import { experiences, education } from '../data/portfolio'

const milestones = [
  { label: 'The foundation', year: '2022', icon: GraduationCap, title: education[1].institution, role: education[1].program, period: education[1].period, copy: education[1].summary },
  { label: 'First client work', year: '2025', icon: Code2, title: experiences[4].company, role: experiences[4].role, period: experiences[4].period, copy: experiences[4].summary },
  { label: 'From build to launch', year: '2026', icon: BriefcaseBusiness, title: experiences[1].company, role: experiences[1].role, period: experiences[1].period, copy: experiences[1].summary },
  { label: 'A security perspective', year: 'Now', icon: ShieldCheck, title: experiences[0].company, role: experiences[0].role, period: experiences[0].period, copy: experiences[0].summary },
]

export function Journey() {
  const [selected, setSelected] = useState(3)
  const active = milestones[selected]
  const Icon = active.icon
  return (
    <div className="journey">
      <div className="journey__orbit" aria-label="Choose a career milestone">
        <div className="journey__ring journey__ring--one" aria-hidden="true" /><div className="journey__ring journey__ring--two" aria-hidden="true" />
        <div className="journey__core" aria-hidden="true"><span>j.</span><small>ALWAYS LEARNING</small></div>
        {milestones.map((item, index) => {
          const NodeIcon = item.icon
          return <button type="button" key={item.label} className={`journey__node journey__node--${index} ${selected === index ? 'is-active' : ''}`} aria-label={`${item.year} ${item.label}`} aria-pressed={selected === index} aria-controls="journey-detail" onClick={() => setSelected(index)}><span className="journey__node-icon"><NodeIcon size={20} aria-hidden="true" /></span><span><strong>{item.year}</strong><small>{item.label}</small></span></button>
        })}
      </div>
      <article className="journey__detail" id="journey-detail" aria-live="polite" aria-atomic="true">
        <div className="journey__detail-top"><Icon size={25} aria-hidden="true" /><span>{String(selected + 1).padStart(2, '0')} / 04</span></div>
        <p className="eyebrow">{active.period}</p><h3>{active.title}</h3><p className="journey__role">{active.role}</p><p>{active.copy}</p>
        <div className="journey__detail-foot"><span>{active.label}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
      </article>
    </div>
  )
}
