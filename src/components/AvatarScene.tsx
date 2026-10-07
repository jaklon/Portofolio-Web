import { useEffect, useRef } from 'react'
import { createAvatarScene } from '../lib/avatar-scene'

interface AvatarSceneProps { url: string; active: boolean; visible: boolean; onLoad: () => void; onFailure: () => void }
export default function AvatarScene({ url, active, visible, onLoad, onFailure }: AvatarSceneProps) {
  const host = useRef<HTMLDivElement>(null)
  const controller = useRef<ReturnType<typeof createAvatarScene> | null>(null)
  const initial = useRef({ active, visible })
  useEffect(() => {
    if (!host.current) return
    try {
      const scene = createAvatarScene(host.current, url, { enabled: initial.current.active, visible: initial.current.visible, onLoad, onFailure })
      controller.current = scene
      return () => { scene.dispose(); controller.current = null }
    } catch { onFailure() }
  }, [url, onLoad, onFailure])
  useEffect(() => controller.current?.setEnabled(active), [active])
  useEffect(() => controller.current?.setVisible(visible), [visible])
  return <div ref={host} className="hero-scene__avatar" aria-hidden="true" />
}
