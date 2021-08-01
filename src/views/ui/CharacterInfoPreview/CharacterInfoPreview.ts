import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CharacterView} from "../../CharacterView";
import {Vector3} from "three";

export class CharacterInfoPreview {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(50, 500 / 950, 0.1, 1000)
  private readonly renderer = new THREE.WebGLRenderer( { alpha: true })
  private readonly ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 1)
  private readonly pointLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1)
  private readonly polarAngle = 1.3
  private controls: OrbitControls
  private character: CharacterView
  constructor() {
    this.init()
  }

  private init() {
    this.setRenderer()
    this.setLights()
    this.setControls()
    this.setCamera()
    this.scene.add(this.ambientLight, this.pointLight)
  }
  private setCamera() {
    this.camera.position.set(2.8,1.2,1)
    this.controls.update()
  }
  private setRenderer() {
    this.renderer.setSize(500, 950)
    this.renderer.setClearColor( 0xffffff, 0 )
    this.renderer.domElement.classList.add('character-info__character-preview')
  }

  private setLights() {
    this.pointLight.position.set(1,2,1)
  }


  private setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.maxPolarAngle = this.polarAngle
    this.controls.minPolarAngle = this.polarAngle
  }

  setCharacter(character: CharacterView) {
    if(this.character) this.character.model.scene.removeFromParent()
    this.character = character
    this.scene.add(this.character.model.scene)
    const point = new Vector3().copy(this.character.model.scene.position)
    this.controls.target = point
    point.y += 1
    this.camera.lookAt(point)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }

  getDomElement() {
    return this.renderer.domElement
  }
}