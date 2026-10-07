interface SectionHeadingProps {
  id?: string
  index: string
  eyebrow: string
  title: string
  copy?: string
}

export function SectionHeading({ id, index, eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__meta">
        <span>{index} / {eyebrow}</span>
      </div>
      <div className="section-heading__content">
        <h2 id={id}>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  )
}
