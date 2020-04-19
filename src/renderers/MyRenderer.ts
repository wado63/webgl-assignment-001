import * as THREE from "three"

export class MyRenderer extends THREE.WebGLRenderer {
  constructor() {
    super({
      preserveDrawingBuffer: true,
    })
    this.fitToWindow()
    this.setClearColor(new THREE.Color(0x666666))
    document.body.appendChild(this.domElement)
  }

  get windowWidth(): number {
    return window.innerWidth
  }
  get windowHeight(): number {
    return window.innerHeight
  }

  fitToWindow(): void {
    this.setSize(this.windowWidth, this.windowHeight)
  }
}
