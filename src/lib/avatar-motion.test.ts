import { describe, expect, it } from 'vitest'
import { Bone, Euler, Group, Quaternion } from 'three'
import { applyAvatarLook, avatarLookTarget } from './avatar-motion'

describe('avatar cursor tracking', () => {
  const rect = { left: 700, top: 150, width: 500, height: 400 }
  const viewport = { width: 1400, height: 900 }
  it('faces forward at the portrait center and limits movement for distant cursors', () => {
    expect(avatarLookTarget(950, 350, rect, viewport)).toEqual({ x: 0, y: 0 })
    expect(avatarLookTarget(-5000, 9000, rect, viewport)).toEqual({ x: -1, y: 1 })
  })
  it('rotates the head around screen axes even under a turned and tilted imported rig', () => {
    const rig = new Group()
    rig.rotation.set(0.2, -Math.PI / 2, 0.08)
    const head = new Bone()
    const rest = new Quaternion().setFromEuler(new Euler(-0.04, -0.18, -0.18))
    head.quaternion.copy(rest)
    rig.add(head)
    rig.updateMatrixWorld(true)
    const before = head.getWorldQuaternion(new Quaternion())
    const expected = new Quaternion().setFromEuler(new Euler(0.12, 0.36, 0, 'YXZ')).multiply(before)
    applyAvatarLook(head, rest, 0.36, 0.12)
    expect(head.getWorldQuaternion(new Quaternion()).angleTo(expected)).toBeLessThan(0.000001)
    applyAvatarLook(head, rest, 0, 0)
    expect(head.quaternion.angleTo(rest)).toBeLessThan(0.000001)
  })
})
