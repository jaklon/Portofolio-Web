// Adapted from the user-supplied SphereImageGrid prompt.
// Retains the Fibonacci sphere, drag rotation, momentum, auto-rotation, and detail view.
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { X } from 'lucide-react'
import { spherePoints, rotateSpherePoint } from '../../lib/sphere-layout'

export interface ImageData {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
}

export interface SphereImageGridProps {
  images: ImageData[]
  containerSize?: number
  sphereRadius?: number
  dragSensitivity?: number
  momentumDecay?: number
  maxRotationSpeed?: number
  baseImageScale?: number
  hoverScale?: number
  perspective?: number
  autoRotate?: boolean
  autoRotateSpeed?: number
  className?: string
  reducedMotion?: boolean
}

function ToolDialog({ image, onClose }: { image: ImageData; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const previous = document.activeElement as HTMLElement | null
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (typeof dialog?.showModal === 'function') dialog.showModal()
    else dialog?.setAttribute('open', '')
    dialog?.querySelector<HTMLButtonElement>('button')?.focus()
    return () => {
      if (dialog?.open && typeof dialog.close === 'function') dialog.close()
      document.body.style.overflow = oldOverflow
      previous?.focus()
    }
  }, [])
  return (
    <dialog ref={dialogRef} className="tool-sphere-dialog" aria-labelledby="tool-dialog-title" aria-describedby="tool-dialog-description" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
      <div className="tool-sphere-dialog__body">
        <button type="button" onClick={onClose} className="tool-sphere-dialog__close" aria-label="Close tool details"><X size={20} aria-hidden="true" /></button>
        <div className="tool-sphere-dialog__logo"><img src={image.src} alt={image.alt} width={80} height={80} /></div>
        <p className="tool-sphere-dialog__category">{image.category}</p>
        <h3 id="tool-dialog-title">{image.title}</h3>
        <p id="tool-dialog-description">{image.description}</p>
      </div>
    </dialog>
  )
}

export default function SphereImageGrid({ images, containerSize = 400, sphereRadius = 152, dragSensitivity = 0.45, momentumDecay = 0.94, maxRotationSpeed = 3, baseImageScale = 0.145, hoverScale = 1.12, perspective = 900, autoRotate = false, autoRotateSpeed = 0.13, reducedMotion = false, className = '' }: SphereImageGridProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const points = useMemo(() => spherePoints(images.length), [images.length])
  const rotationRef = useRef({ x: 15, y: 15 })
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    const element = stageRef.current
    if (!element) return
    const stage: HTMLDivElement = element
    let disposed = false
    let frame = 0
    let lastTime = 0
    let visible = true
    let width = containerSize
    const rotation = rotationRef.current
    let velocity = { x: 0, y: 0 }
    let drag: { id: number; x: number; y: number; total: number; index: number | null } | null = null
    const clamp = (value: number) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, value))
    const canMove = () => !disposed && visible && !document.hidden && !selectedImage
    const auto = () => autoRotate

    function paint() {
      const radius = sphereRadius * width / containerSize
      const baseSize = Math.max(44, width * baseImageScale)
      points.forEach((point, index) => {
        const node = nodeRefs.current[index]
        if (!node) return
        const rotated = rotateSpherePoint(point, rotation.x, rotation.y)
        const projection = perspective / (perspective - rotated.z * radius)
        const scale = 0.68 + (rotated.z + 1) * 0.19
        const opacity = rotated.z < -0.08 ? 0.3 : 0.76 + Math.max(0, rotated.z) * 0.24
        const interactive = rotated.z >= -0.08
        node.style.width = `${baseSize}px`
        node.style.height = `${baseSize}px`
        node.style.transform = `translate(-50%, -50%) translate(${rotated.x * radius * projection}px, ${rotated.y * radius * projection}px) scale(${scale})`
        node.style.opacity = String(opacity)
        node.style.zIndex = String(Math.round(100 + rotated.z * 50))
        node.style.pointerEvents = interactive ? 'auto' : 'none'
        node.tabIndex = interactive ? 0 : -1
        node.setAttribute('aria-hidden', String(!interactive))
      })
    }
    function stop() { cancelAnimationFrame(frame); frame = 0; lastTime = 0 }
    function wake() { if (!frame && canMove() && (auto() || Math.abs(velocity.x) + Math.abs(velocity.y) > 0.01)) frame = requestAnimationFrame(tick) }
    function tick(time: number) {
      frame = 0
      if (!canMove() || drag) return
      const step = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1
      lastTime = time
      const decay = Math.pow(reducedMotion ? 0 : momentumDecay, step)
      velocity.x *= decay
      velocity.y *= decay
      rotation.x = (rotation.x + velocity.x * step) % 360
      rotation.y = (rotation.y + velocity.y * step + (auto() ? autoRotateSpeed * step : 0)) % 360
      paint()
      wake()
    }
    function resize() { width = stage.clientWidth || containerSize; paint() }
    function down(event: PointerEvent) {
      if (event.button !== 0 || !canMove()) return
      stop()
      velocity = { x: 0, y: 0 }
      const node = (event.target as Element).closest<HTMLButtonElement>('[data-sphere-index]')
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, total: 0, index: node ? Number(node.dataset.sphereIndex) : null }
      stage.setPointerCapture?.(event.pointerId)
      stage.classList.add('is-dragging')
    }
    function move(event: PointerEvent) {
      if (!drag || drag.id !== event.pointerId) return
      const deltaX = event.clientX - drag.x
      const deltaY = event.clientY - drag.y
      drag.total += Math.abs(deltaX) + Math.abs(deltaY)
      velocity = { x: clamp(-deltaY * dragSensitivity), y: clamp(deltaX * dragSensitivity) }
      rotation.x += velocity.x
      rotation.y += velocity.y
      drag.x = event.clientX
      drag.y = event.clientY
      paint()
    }
    function end(event: PointerEvent) {
      if (!drag || drag.id !== event.pointerId) return
      const completed = drag
      drag = null
      stage.classList.remove('is-dragging')
      if (stage.hasPointerCapture?.(event.pointerId)) stage.releasePointerCapture(event.pointerId)
      if (event.type === 'pointerup' && completed.total <= 6 && completed.index !== null) setSelectedImage(images[completed.index] ?? null)
      if (event.type === 'pointercancel' || reducedMotion) velocity = { x: 0, y: 0 }
      wake()
    }
    function key(event: KeyboardEvent) {
      if (event.target !== stage) return
      const deltas: Record<string, [number, number]> = { ArrowLeft: [0, -18], ArrowRight: [0, 18], ArrowUp: [-18, 0], ArrowDown: [18, 0] }
      if (!deltas[event.key] && event.key !== 'Home') return
      event.preventDefault()
      velocity = { x: 0, y: 0 }
      if (event.key === 'Home') Object.assign(rotation, { x: 15, y: 15 })
      else { rotation.x += deltas[event.key][0]; rotation.y += deltas[event.key][1] }
      paint()
    }
    function visibility() { if (document.hidden) stop(); else wake() }
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize)
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else stop() })
    resizeObserver?.observe(stage)
    observer?.observe(stage)
    resize()
    wake()
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', end)
    stage.addEventListener('pointercancel', end)
    stage.addEventListener('lostpointercapture', end)
    stage.addEventListener('keydown', key)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      disposed = true
      stop()
      observer?.disconnect()
      resizeObserver?.disconnect()
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', end)
      stage.removeEventListener('pointercancel', end)
      stage.removeEventListener('lostpointercapture', end)
      stage.removeEventListener('keydown', key)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [images, points, containerSize, sphereRadius, dragSensitivity, momentumDecay, maxRotationSpeed, baseImageScale, perspective, autoRotate, autoRotateSpeed, reducedMotion, selectedImage])

  return (
    <div className={`tool-sphere ${className}`}>
      <div ref={stageRef} className="tool-sphere__stage" tabIndex={0} role="group" aria-label="Technology logo sphere. Drag to rotate, or use the arrow keys. Select a logo to learn more." style={{ maxWidth: containerSize, '--sphere-hover': hoverScale } as CSSProperties}>
        <div className="tool-sphere__glow" aria-hidden="true" />
        <div className="tool-sphere__orbit" aria-hidden="true" /><div className="tool-sphere__orbit tool-sphere__orbit--two" aria-hidden="true" />
        {images.map((image, index) => <button key={image.id} ref={node => { nodeRefs.current[index] = node }} type="button" data-sphere-index={index} className="tool-sphere__node" aria-label={`About ${image.title}`} title={image.title} onClick={event => { if (event.detail === 0) setSelectedImage(image) }}><span><img src={image.src} alt={image.alt} width={36} height={36} draggable={false} /></span></button>)}
      </div>
      <details className="tool-sphere__list" open={showList} onToggle={event => setShowList(event.currentTarget.open)}>
        <summary>Browse all {images.length} tools <span aria-hidden="true">↗</span></summary>
        <div>{images.map(image => <button key={image.id} type="button" onClick={() => setSelectedImage(image)}><img src={image.src} alt="" width={20} height={20} /><span>{image.title}</span></button>)}</div>
      </details>
      {selectedImage && <ToolDialog image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}
