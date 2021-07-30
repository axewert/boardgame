import {Group} from "three";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three'
import {log} from "util";
export class CharacterSelectorView {
  background: GLTF
  setBackground(background: GLTF) {
    this.background = background
  }
  async load() {
    const gltf = await new GLTFLoader().loadAsync('data/ui/characterselector/backgrounds/human/model.gltf')
    gltf.scene.traverse(node => {
      if (node.type === 'SkinnedMesh') {
        const material = (node as THREE.SkinnedMesh).material as THREE.Material
        // @ts-ignore
        material.setValues({metalness: 0.1})
      }
    })
    this.setBackground(gltf)
    return gltf
  }
}