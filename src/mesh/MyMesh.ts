import * as THREE from "three"

export interface MyMesh extends THREE.Group {
  boxes: THREE.Mesh[]
}

export class MyMesh extends THREE.Group {
  constructor(
    geometry: THREE.Geometry,
    material: THREE.Material,
    size: number,
    count: number
  ) {
    super()
    const cordinatePosition = new THREE.Vector3(size / 2, size / 2, 0)
    this.position.add(cordinatePosition)
    this.position.add(
      new THREE.Vector3((-size * count) / 2, (-size * count) / 2, 0)
    )
    const numbers = [...Array(count).keys()] // e.g. 1,2,3,4,5 ...
    this.boxes = numbers
      .map(x => {
        return numbers.map(y => {
          const box = new THREE.Mesh(geometry, material)
          box.position.set(x * size, y * size, 0)
          this.add(box)
          return box
        })
      })
      .flat()
  }

  roll(speed = 0.02): void {
    this.boxes.forEach(mesh => {
      mesh.rotation.x += speed
      mesh.rotation.y += speed
    })
  }
}
