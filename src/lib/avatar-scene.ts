import {
  ACESFilmicToneMapping, Box3, DirectionalLight, Group, HemisphereLight,
  Mesh, OrthographicCamera, Quaternion, Scene, SkinnedMesh, SRGBColorSpace,
  Texture, Vector3, WebGLRenderer, type Material, type Object3D,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import { applyAvatarLook, avatarLookTarget } from './avatar-motion'
import { hero3D } from '../data/hero'

interface SceneOptions { enabled: boolean; visible: boolean; onLoad: () => void; onFailure: () => void }

function disposeModel(root: Object3D) {
  const textures = new Set<Texture>()
  const materials = new Set<Material>()
  const skeletons = new Set<SkinnedMesh['skeleton']>()
  root.traverse(object => {
    if (!(object instanceof Mesh)) return
    object.geometry.dispose()
    if (object instanceof SkinnedMesh) skeletons.add(object.skeleton)
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material)
      for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value)
    }
  })
  for (const texture of textures) {
    texture.dispose()
    const bitmap = texture.source.data as { close?: () => void } | undefined
    bitmap?.close?.()
  }
  for (const material of materials) material.dispose()
  for (const skeleton of skeletons) skeleton.dispose()
}

export function createAvatarScene(host: HTMLElement, url: string, options: SceneOptions) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.setClearColor(0x000000, 0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)
  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 30)
  camera.position.set(0, hero3D.cameraHeight, 4)
  camera.lookAt(0, hero3D.cameraHeight, 0)
  scene.add(new HemisphereLight(0xf4f0ff, 0x55596d, 2.1))
  const key = new DirectionalLight(0xfff5eb, 2.7)
  key.position.set(-2.5, 3.5, 4)
  const fill = new DirectionalLight(0xc1d3ff, 1.3)
  fill.position.set(3, 2, 2)
  const rim = new DirectionalLight(0xc9bcff, 2.8)
  rim.position.set(1, 2.5, -3)
  scene.add(key, fill, rim)
  const portrait = new Group()
  portrait.rotation.y = hero3D.rotationY
  scene.add(portrait)
  let model: Object3D | undefined
  let head: Object3D | undefined
  let chest: Object3D | undefined
  let headRest: Quaternion | undefined
  let chestRest: Quaternion | undefined
  let enabled = options.enabled
  let visible = options.visible
  let disposed = false
  let loaded = false
  let frame = 0
  let previous = 0
  let currentX = 0
  let currentY = 0
  let target = { x: 0, y: 0 }
  const abort = new AbortController()
  const timeout = window.setTimeout(() => abort.abort(), 45000)

  function render() {
    if (!disposed && loaded && visible && !document.hidden) {
      if (import.meta.env.DEV) {
        renderer.domElement.dataset.lookX = currentX.toFixed(3)
        renderer.domElement.dataset.lookY = currentY.toFixed(3)
      }
      renderer.render(scene, camera)
    }
  }
  function tick(now: number) {
    frame = 0
    if (disposed || !enabled || !visible || document.hidden || !loaded) return
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60
    previous = now
    const blend = 1 - Math.exp(-9 * dt)
    currentX += (target.x - currentX) * blend
    currentY += (target.y - currentY) * blend
    portrait.rotation.set(0, hero3D.rotationY + currentX * 0.13, -currentX * 0.012)
    portrait.updateMatrixWorld(true)
    if (chest && chestRest) applyAvatarLook(chest, chestRest, currentX * 0.08, currentY * 0.025)
    if (head && headRest) applyAvatarLook(head, headRest, currentX * 0.36, currentY * 0.16)
    render()
    if (Math.abs(target.x - currentX) + Math.abs(target.y - currentY) > 0.0004) frame = requestAnimationFrame(tick)
  }
  function wake() {
    if (!frame && enabled && visible && !document.hidden && loaded && !disposed) { previous = 0; frame = requestAnimationFrame(tick) }
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0 }
  function resize() {
    const width = Math.max(host.clientWidth, 1)
    const height = Math.max(host.clientHeight, 1)
    const half = hero3D.frameHeight / 2
    camera.left = -half * width / height
    camera.right = half * width / height
    camera.top = half
    camera.bottom = -half
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.setSize(width, height, false)
    render()
  }
  function onPointer(event: PointerEvent) {
    if (!enabled || !visible || !loaded) return
    target = avatarLookTarget(event.clientX, event.clientY, host.getBoundingClientRect(), { width: window.innerWidth, height: window.innerHeight })
    wake()
  }
  function center() { target = { x: 0, y: 0 }; wake() }
  function onPointerOut(event: PointerEvent) { if (!event.relatedTarget) center() }
  function onVisibility() { if (document.hidden) stop(); else { render(); wake() } }
  function onContextLost(event: Event) { event.preventDefault(); if (!disposed) { stop(); options.onFailure() } }
  const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(resize)
  observer?.observe(host)
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('pointerout', onPointerOut)
  window.addEventListener('blur', center)
  window.addEventListener('scroll', center, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  renderer.domElement.addEventListener('webglcontextlost', onContextLost)

  async function load() {
    try {
      const response = await fetch(url, { signal: abort.signal })
      if (!response.ok) throw new Error(`Avatar request failed: ${response.status}`)
      const data = await response.arrayBuffer()
      if (disposed) return
      const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(data, '')
      if (disposed) { disposeModel(gltf.scene); return }
      model = gltf.scene
      model.updateMatrixWorld(true)
      const bounds = new Box3().setFromObject(model)
      const size = bounds.getSize(new Vector3())
      const center = bounds.getCenter(new Vector3())
      if (size.y <= 0 || !Number.isFinite(size.y)) throw new Error('Avatar has no visible geometry')
      const normalize = new Group()
      normalize.scale.setScalar(2 / size.y)
      model.position.sub(new Vector3(center.x, bounds.min.y, center.z))
      normalize.add(model)
      portrait.add(normalize)
      model.traverse(object => {
        if (/head$/i.test(object.name) && !head) head = object
        if (/spine2$|chest$/i.test(object.name) && !chest) chest = object
        if (object instanceof Mesh) object.frustumCulled = false
      })
      headRest = head?.quaternion.clone()
      chestRest = chest?.quaternion.clone()
      loaded = true
      resize()
      options.onLoad()
      wake()
    } catch { if (!disposed) options.onFailure() }
    finally { window.clearTimeout(timeout) }
  }
  void load()
  return {
    setEnabled(value: boolean) { enabled = value; if (value) wake(); else stop() },
    setVisible(value: boolean) { visible = value; if (value) { render(); wake() } else stop() },
    dispose() {
      disposed = true
      abort.abort()
      window.clearTimeout(timeout)
      stop()
      observer?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('blur', center)
      window.removeEventListener('scroll', center)
      document.removeEventListener('visibilitychange', onVisibility)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      if (model) disposeModel(model)
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    },
  }
}
