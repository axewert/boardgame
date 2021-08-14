import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


export class CharacterInfoPreview {
  private readonly renderer = new THREE.WebGLRenderer()
  private readonly frustum = new THREE.Frustum()
  private readonly scene = new THREE.Scene()
  private controls: OrbitControls
  private camera: THREE.PerspectiveCamera
  private _character: THREE.Group
  constructor(width: number, height: number) {
    this.init(width, height)
  }

  init(width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera = new THREE.PerspectiveCamera(50,  width / height, 0.1, 10000)
    this.camera.position.set(0,0,5)
    this.scene.add(this.camera)
    this.scene.background = new THREE.Color('#8d6060')
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
  }

  get domElement() {
    return this.renderer.domElement
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
  set character(character: THREE.Group) {
    if (this._character) this._character.removeFromParent()
    this._character = character
    this.scene.add(this._character)
  }
}
