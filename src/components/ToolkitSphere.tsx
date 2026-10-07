import { useMemo, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import SphereImageGrid from './ui/img-sphere'
import { toolkit, toolkitCategories, type ToolkitCategory } from '../data/toolkit'
import '../ToolkitSphere.css'

export function ToolkitSphere() {
  const reduced = useReducedMotion()
  const [category, setCategory] = useState<ToolkitCategory | 'all'>('all')
  const images = useMemo(() => toolkit.filter(tool => category === 'all' || tool.category === category).map(tool => ({ ...tool, category: toolkitCategories.find(group => group.id === tool.category)?.label })), [category])
  return (
    <section className="toolkit-sphere" aria-labelledby="toolkit-title">
      <div className="toolkit-sphere__heading"><div><p>THE TOOLKIT</p><h3 id="toolkit-title">Different tools.<br /><span>Connected ideas.</span></h3></div><span className="toolkit-sphere__count">{toolkit.length}<small>tools & technologies</small></span></div>
      <div className="toolkit-sphere__filters" role="group" aria-label="Technology category"><button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All</button>{toolkitCategories.map(group => <button type="button" key={group.id} aria-pressed={category === group.id} onClick={() => setCategory(group.id)}>{group.label}</button>)}</div>
      <SphereImageGrid key={category} images={images} containerSize={400} sphereRadius={143} autoRotate={!reduced} reducedMotion={!!reduced} />
      <div className="toolkit-sphere__footer"><p>Drag to explore.<br /><span>Select a logo to learn more.</span></p></div>
    </section>
  )
}
