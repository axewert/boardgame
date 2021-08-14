import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export class WorldView {
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(50,  window.innerWidth / window.innerHeight, 0.1, 10000)
  private readonly renderer = new THREE.WebGLRenderer()
  private readonly ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 3)
  private readonly pointLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1)
  private  frustum = new THREE.Frustum()
  private cachedTiles: THREE.Mesh[] = []
  private tiles = new THREE.Group()
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
    this.camera.updateProjectionMatrix()
    this.controls.screenSpacePanning = false
    this.loadTiles().then(() => {
      this.scene.add(...this.cachedTiles)
    })
  }

  isFrustumCulled(tile: THREE.Object3D) {
    this.camera.updateProjectionMatrix()
    this.frustum.setFromProjectionMatrix( new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse))
    return this.frustum.intersectsObject(tile)
  }
  setVisible() {
    this.cachedTiles.forEach(tile => {
      if(this.isFrustumCulled(tile)) tile.visible = false
    })
  }
  getTiles(x: number, y: number) {
    const tiles = []
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        tiles.push(`${i}_${j}`)
      }
    }
    return tiles
  }
  async loadTiles() {
    return Promise.all(this.getTiles(32,48).map(tileName => {
      return this.load(tileName).then(res => {
        this.cachedTiles.push(res)
      })
    }))
  }
  async load(tileName: string) {
    const tile =  await new GLTFLoader().loadAsync(`assets/world/tiles/azeroth/eastern_kingdoms/${tileName}.gltf`)
    const texture = await new THREE.TextureLoader().loadAsync(`assets/world/tiles/azeroth/eastern_kingdoms/textures/tex_${tileName}.png`)
    texture.flipY = false
    const mesh = tile.scene.getObjectByName(tileName) as THREE.Mesh
    mesh.material = new THREE.MeshBasicMaterial({map: texture})
    return mesh
  }
  render(clock: THREE.Clock) {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
  get domElement() {
    return this.renderer.domElement
  }
}