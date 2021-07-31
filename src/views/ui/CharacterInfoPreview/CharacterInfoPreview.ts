import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class CharacterInfoPreview {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(75, 500 / 950, 0.1, 1000)
  private readonly renderer = new THREE.WebGLRenderer( { alpha: true })
  private readonly ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 1)
  private readonly pointLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1)
  private controls: OrbitControls
  private character: THREE.Group
  constructor() {
    this.init()
  }

  private init() {
    this.setRenderer()
    this.setLights()
    this.setControls()
    this.setCamera()
    this.scene.add(this.ambientLight, this.pointLight)
    this.loadModel().then(res => {
      this.character = res.scene
      this.character.add(this.camera)
      this.scene.add(this.character)
      this.camera.lookAt(this.character.position)
    })
  }
  private setRenderer() {
    this.renderer.setSize(500, 950)
    this.renderer.setClearColor( 0xffffff, 0 )
    this.renderer.domElement.classList.add('character-info__character-preview')
  }
  private setLights() {
    this.pointLight.position.set(1,2,1)
  }
  private setCamera() {
    this.camera.position.set(1,1,0)
    this.controls.update()
  }
  private setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = false
    this.controls.enablePan = false
    this.controls.maxPolarAngle = Math.PI/4
    this.controls.minPolarAngle = Math.PI/4
  }

  private async loadModel() {
    return new GLTFLoader().loadAsync('/assets/characters/bloodelf/hunter/female/model.gltf')
  }
  render() {
    this.renderer.render(this.scene, this.camera)
    this.controls.update();
  }
  getDomElement() {
    return this.renderer.domElement
  }
}