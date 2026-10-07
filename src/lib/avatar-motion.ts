import { Euler, Quaternion, type Object3D } from 'three'

interface PortraitRect { left: number; top: number; width: number; height: number }
const clamp = (value: number) => Math.max(-1, Math.min(1, value))

export function avatarLookTarget(x: number, y: number, rect: PortraitRect, viewport: { width: number; height: number }) {
  return {
    x: clamp((x - rect.left - rect.width / 2) / Math.max(rect.width / 2, viewport.width * 0.42, 1)),
    y: clamp((y - rect.top - rect.height / 2) / Math.max(rect.height / 2, viewport.height * 0.42, 1)),
  }
}

const parentRotation = new Quaternion()
const delta = new Quaternion()
const rotation = new Euler(0, 0, 0, 'YXZ')

// Convert screen axes into the imported rig's local axes, preserving its pose.
export function applyAvatarLook(bone: Object3D, rest: Quaternion, yaw: number, pitch: number) {
  if (!bone.parent) return
  bone.parent.getWorldQuaternion(parentRotation)
  delta.setFromEuler(rotation.set(pitch, yaw, 0, 'YXZ'))
  bone.quaternion.copy(parentRotation).invert().multiply(delta).multiply(parentRotation).multiply(rest)
  bone.updateMatrixWorld(true)
}
