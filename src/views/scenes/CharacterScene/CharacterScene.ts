import * as THREE from 'three'
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Vector3} from "three";

export class CharacterScene {
  private meshes = new THREE.AnimationObjectGroup()
  private animations: THREE.AnimationClip[]
  private mixer: THREE.AnimationMixer
  constructor(
    private model: GLTF
  ) {
    this.init()
  }

  init() {

    this.model.scene.traverse(child => {
      if (child.type.match(/Mesh/)) this.meshes.add(child)
    })
    this.mixer = new THREE.AnimationMixer(this.meshes)
    this.animations = this.model.animations
    const clip = THREE.AnimationClip.findByName(this.animations, 'animation_0')
    clip.duration = 2.9 //6.9 -- Jaina
    const action = this.mixer.clipAction(clip)
    action.play()
  }

  render(delta: number) {
    this.mixer.update(delta)
  }
  get scene() {
    return this.model.scene
  }
  removeFromParent() {
    this.model.scene.removeFromParent()
  }
}