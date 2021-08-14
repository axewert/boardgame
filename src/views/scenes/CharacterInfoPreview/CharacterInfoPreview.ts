import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {CharacterScene} from "../CharacterScene/CharacterScene";
import {Vector3} from "three";


export class CharacterInfoPreview {
  private readonly renderer = new THREE.WebGLRenderer({alpha: true})
  private readonly frustum = new THREE.Frustum()
  private readonly scene = new THREE.Scene()
  private readonly pointLight = new THREE.PointLight('#dbcfa3',10)
  private controls: OrbitControls
  private camera: THREE.PerspectiveCamera
  private _character: CharacterScene
  constructor(width: number, height: number) {
    this.init(width, height)
  }

  init(width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera = new THREE.PerspectiveCamera(50,  width / height, 0.1, 10000)
    this.camera.position.set(4,3,2)
    this.pointLight.position.set(5,5,5)
    this.scene.add(this.camera, this.pointLight)
    this.renderer.setClearColor( 0x000000, 0)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
  }

  get domElement() {
    return this.renderer.domElement
  }

  render(delta: number) {
    this.renderer.render(this.scene, this.camera)
    this._character.render(delta)
  }
  set character(character: CharacterScene) {
    if (this._character) this._character.removeFromParent()
    this._character = character
    this.scene.add(this._character.scene)

    this.camera.lookAt(new Vector3(0,1.5,0))
    this.controls.target = new Vector3(0,1.5,0)
    this.controls.update()
  }
}
