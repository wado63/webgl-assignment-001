import * as THREE from "three"

export class MyAmbientLight extends THREE.AmbientLight {
  constructor() {
    const LIGHT_COLOR = 0xffffff
    const LIGHT_INTENSITY = 0.2

    super(LIGHT_COLOR, LIGHT_INTENSITY)
  }
}
