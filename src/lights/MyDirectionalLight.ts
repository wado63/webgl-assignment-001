import * as THREE from "three"

export class MyDirectionalLight extends THREE.DirectionalLight {
  constructor() {
    const LIGHT_COLOR = 0xffffff
    const LIGHT_POSITION = [1, 1, 1]

    super(LIGHT_COLOR)
    this.position.copy(new THREE.Vector3(...LIGHT_POSITION)) //todo: 本当はVector3 setの型を拡張したい。
  }
}
