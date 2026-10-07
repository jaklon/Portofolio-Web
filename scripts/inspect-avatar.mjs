import { readFile } from 'node:fs/promises'
import { Box3, Vector3, Quaternion } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'

// Decode the actual mesh and skeleton without needing a browser for textures.
const source = await readFile(new URL('../public/models/avatar.glb', import.meta.url))
const jsonLength = source.readUInt32LE(12)
const json = JSON.parse(source.toString('utf8', 20, 20 + jsonLength).trim())
const metadata = { extensions: json.extensionsRequired, vertices: json.accessors[json.meshes[0].primitives[0].attributes.POSITION].count, embeddedImages: json.images.length }
delete json.materials
for (const mesh of json.meshes) for (const primitive of mesh.primitives) delete primitive.material
const content = Buffer.from(JSON.stringify(json))
const padded = Buffer.alloc(Math.ceil(content.length / 4) * 4, 32)
content.copy(padded)
const binary = source.subarray(20 + jsonLength)
const header = Buffer.alloc(20)
header.write('glTF')
header.writeUInt32LE(2, 4)
header.writeUInt32LE(20 + padded.length + binary.length, 8)
header.writeUInt32LE(padded.length, 12)
header.writeUInt32LE(0x4e4f534a, 16)
const buffer = Buffer.concat([header, padded, binary])
const { scene } = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '')
scene.updateMatrixWorld(true)
const box = new Box3().setFromObject(scene)
const bones = []
scene.traverse(object => {
  if (/Head$|Neck$|Spine2$|Hips$|Shoulder$/.test(object.name)) bones.push({ name: object.name, position: object.getWorldPosition(new Vector3()).toArray(), quaternion: object.getWorldQuaternion(new Quaternion()).toArray() })
})
console.log(JSON.stringify({ ...metadata, bounds: { min: box.min.toArray(), max: box.max.toArray(), size: box.getSize(new Vector3()).toArray() }, bones }, null, 2))
