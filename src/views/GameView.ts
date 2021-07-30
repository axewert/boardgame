import * as THREE from 'three'
import {CharacterSelectorView} from "./CharacterSelectorView";
import {CharacterInfoView} from "./CharacterInfoView";
import {CharacterCreatorView} from "./CharacterCreatorView";

import('./main.scss')

export class GameView {
  root: HTMLElement
  scene = new THREE.Scene()
  camera =  new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer =  new THREE.WebGLRenderer()
  light = new THREE.AmbientLight(new THREE.Color('#e2d2a2'), 4)
  characterSelector = new CharacterSelectorView()
  characterInfo = new CharacterInfoView()
  characterCreator = new CharacterCreatorView()
  constructor(root: HTMLElement) {
    this.root = root
  }
  init() {
    this.root.insertAdjacentHTML('beforeend', this.characterInfo.html())
    this.root.insertAdjacentHTML('beforeend', this.characterCreator.html())
  }
  // init() {
  //   this.renderer.setSize(window.innerWidth, window.innerHeight)
  //   this.scene.background = new THREE.Color('#ffffff')
  //   document.body.appendChild(this.renderer.domElement)
  //   this.scene.add(this.camera, this.light)
  //   this.render()
  // }
  //
  // render() {
  //   requestAnimationFrame(this.render.bind(this))
  //   this.renderer.render(this.scene, this.camera)
  // }
}