import "core-js/stable"
import "regenerator-runtime/runtime"
import * as THREE from "three"
import * as dat from "dat.gui"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MyRenderer } from "~/renderers/MyRenderer"
import { MyCamera } from "~/cameras/MyCamera"
import { MyDirectionalLight } from "~/lights/MyDirectionalLight"
import { MyAmbientLight } from "~/lights/MyAmbientLight"
import { MyMesh } from "~/mesh/MyMesh"

const MATERIAL_PARAM = {
  color: 0x3399ff,
  specular: 0xffffff,
}
const controls = {
  size: 2,
  count: 2,
  run: true,
  isDown: false,
  speed: 0.01,
}

window.addEventListener("DOMContentLoaded", () => {
  const gui = new dat.GUI()
  gui.add(controls, "speed", 0.01, 0.2, 0.01)
  // レンダラーを作成
  const myRenderer = new MyRenderer()

  // シーンを作成
  const scene = new THREE.Scene()

  // 平行光源を生成
  const myLight = new MyDirectionalLight()
  scene.add(myLight)

  //環境光源を追加
  const myAmbientLight = new MyAmbientLight()
  scene.add(myAmbientLight)

  // カメラを作成
  const myCamera = new MyCamera()

  //helperを作成
  const axesHelper = new THREE.AxesHelper(100.0)
  scene.add(axesHelper)

  //カメラコントロールの設定
  const orbitControls = new OrbitControls(myCamera, myRenderer.domElement)
  orbitControls.update()

  const material = new THREE.MeshPhongMaterial(MATERIAL_PARAM)

  //meshを作成
  const createGeometry = (size: number): THREE.BoxGeometry =>
    new THREE.BoxGeometry(size, size, size)

  let geometory = createGeometry(controls.size)

  let myMesh = new MyMesh(geometory, material, controls.size, controls.count)
  scene.add(myMesh)

  const setMesh = (): void => {
    scene.remove(myMesh)
    geometory.dispose()
    geometory = createGeometry(controls.size)
    myMesh = new MyMesh(geometory, material, controls.size, controls.count)
    scene.add(myMesh)
  }

  gui.add(controls, "size", 1, 10, 1).onFinishChange(setMesh)
  gui.add(controls, "count", 1, 10, 1).onFinishChange(setMesh)

  //frame単位の処理
  const main = (): void => {
    if (controls.isDown) myMesh.roll(controls.speed)
    myRenderer.setClearColor(new THREE.Color(0x666666))

    // 描画
    myRenderer.render(scene, myCamera)
  }

  //animationLoop
  const tick = (): void => {
    if (!controls.run) return
    requestAnimationFrame(tick)
    main()
  }
  tick()

  const property = {
    reset(): void {
      setMesh()
      if (!controls.run) {
        controls.run = true
        tick()
      }
    },
  }
  gui.add(property, "reset")

  //resize時にcanvasのサイズとカメラのアスペクト比の調整
  let timer: NodeJS.Timeout
  window.addEventListener(
    "resize",
    () => {
      if (timer) {
        window.clearTimeout(timer)
      }

      timer = setTimeout(function () {
        myCamera.fitToWindow()
        myRenderer.fitToWindow()
      }, 200)
    },
    false
  )

  window.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        alert("stop!")
        return (controls.run = false)
      }
      controls.isDown = true
    },
    false
  )

  window.addEventListener(
    "keyup",
    () => {
      controls.isDown = false
    },
    false
  )
})
