import { describe, expect, it } from 'vitest'
import { rotateSpherePoint, spherePoints } from './sphere-layout'

describe('tool sphere geometry', () => {
  it('places distinct tools on a unit sphere, including empty and single-tool sets', () => {
    expect(spherePoints(0)).toEqual([])
    for (const count of [1, 5, 34]) {
      const points = spherePoints(count)
      expect(points).toHaveLength(count)
      expect(new Set(points.map(point => JSON.stringify(point))).size).toBe(count)
      points.forEach(point => expect(Math.hypot(point.x, point.y, point.z)).toBeCloseTo(1, 10))
    }
  })

  it('rotates in the expected axes and preserves distance after combined rotations', () => {
    const yaw = rotateSpherePoint({ x: 1, y: 0, z: 0 }, 0, 90)
    expect(yaw.x).toBeCloseTo(0)
    expect(yaw.z).toBeCloseTo(-1)
    const pitch = rotateSpherePoint({ x: 0, y: 1, z: 0 }, 90, 0)
    expect(pitch.y).toBeCloseTo(0)
    expect(pitch.z).toBeCloseTo(1)
    spherePoints(34).forEach(point => {
      const rotated = rotateSpherePoint(point, 136, -287)
      expect(Math.hypot(rotated.x, rotated.y, rotated.z)).toBeCloseTo(1, 10)
    })
  })
})
