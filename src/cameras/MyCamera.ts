import * as THREE from "three"

export class MyCamera extends THREE.PerspectiveCamera {
  constructor() {
    super(60, 800 / 600, 0.1, 100)
    this.position.set(0, 5, 10)
    this.fitToWindow()
  }

  get windowWidth(): number {
    return window.innerWidth
  }
  get windowHeight(): number {
    return window.innerHeight
  }

  fitToWindow(): void {
    // カメラが撮影する視錐台のアスペクト比を再設定
    this.aspect = this.windowWidth / this.windowHeight
    // カメラのパラメータが変更されたときは行列を更新する
    this.updateProjectionMatrix()
  }
}
