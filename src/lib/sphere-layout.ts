export interface SpherePoint { x: number; y: number; z: number }

// Adapted from the supplied SphereImageGrid's Fibonacci distribution and X/Y rotations.
export function spherePoints(count: number): SpherePoint[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - 2 * (index + 0.5) / count
    const radius = Math.sqrt(Math.max(0, 1 - y * y))
    const angle = goldenAngle * index
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius }
  })
}

export function rotateSpherePoint(point: SpherePoint, x: number, y: number): SpherePoint {
  const yaw = y * Math.PI / 180
  const pitch = x * Math.PI / 180
  const newX = point.x * Math.cos(yaw) + point.z * Math.sin(yaw)
  const newZ = -point.x * Math.sin(yaw) + point.z * Math.cos(yaw)
  return { x: newX, y: point.y * Math.cos(pitch) - newZ * Math.sin(pitch), z: point.y * Math.sin(pitch) + newZ * Math.cos(pitch) }
}
