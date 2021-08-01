import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export class WorldView {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(50,  window.innerWidth / window.innerHeight, 0.1, 10000)
  private readonly renderer = new THREE.WebGLRenderer()
  private readonly ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 3)
  private readonly pointLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1)
  private controls: OrbitControls
  constructor(private root: HTMLElement) {
    this.init()
  }
  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.scene.background = new THREE.Color('#8d6060')
    this.root.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
    this.camera.position.set(-51.777089808924416, 231.7484010122725, -8971.85837463571)
    this.controls.target = new THREE.Vector3(-159.06925392911927, 80.09302927832343, -8851.895144103355)
    this.camera.lookAt(new THREE.Vector3(-159.06925392911927, 80.09302927832343, -8851.895144103355))
    this.controls.screenSpacePanning = false


    this.load(32,48).then(res => {
      new THREE.TextureLoader().load(`assets/world/azeroth/eastern_kingdoms/elwynn_forest/tex_32_48.png`, tex => {
        (res.scene.children[0] as THREE.Mesh).material = new THREE.MeshBasicMaterial({map: tex})
        tex.flipY = false
      })

      this.scene.add(res.scene, this.camera, this.ambientLight)

      this.controls.update()
    })

    this.load(32,49).then(res => {
      new THREE.TextureLoader().load(`assets/world/azeroth/eastern_kingdoms/elwynn_forest/tex_32_49.png`, tex => {
        tex.flipY = false
        // @ts-ignore
        res.scene.children[0].material = new THREE.MeshBasicMaterial({map: tex})
      })
      this.scene.add(res.scene)
    })

  }
  loadTiles() {

  }
  async load(x: number,y: number) {
    return await new GLTFLoader().loadAsync(`assets/world/azeroth/eastern_kingdoms/elwynn_forest/${x}_${y}.gltf`)

  }
  render() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}