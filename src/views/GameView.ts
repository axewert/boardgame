import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer"
import {Action} from "../typings/observerActionTypes"
import {Subject} from "../utlis/observer/Subject"
import {CharacterModel} from "../models/CharacterModel"
import {WorldView} from "./WorldView"
import {StartScreen} from "./screens/StartScreen/StartScreen"
import {CreateNewGame} from "./screens/CreateNewGame/CreateNewGame"
import {CharacterInfo} from "./screens/CharacterInfo/CharacterInfo"
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader"
import {Loader} from "../utlis/loader/Loader"

export class GameView {
  private readonly root: HTMLElement
  private readonly subject = new Subject()
  private readonly clock = new THREE.Clock()
  private characters: GLTF[] = []
  private worldView: WorldView
  private needsUpdate = false
  private activeScreen: StartScreen | CreateNewGame
  private characterInfo: CharacterInfo
  private readonly loader = new Loader()
  constructor(root: HTMLElement) {
    this.root = root
  }

  renderStartScreen() {
    this.activeScreen = new StartScreen(this.root, this.notify.bind(this))
  }
  renderCreateNewGame(characters: CharacterModel[]) {
    this.activeScreen.destroy()
    this.root.innerHTML = null
    this.activeScreen = new CreateNewGame(this.root, this.notify.bind(this))
    this.characterInfo = new CharacterInfo(this.root, this.notify.bind(this))
    this.createCharacters(characters)
  }
  toggleCreateNewCharacter() {
    this.characterInfo.toggleVisible()
    this.needsUpdate = true
    // this.characterInfo.character = this.characters[0].scene
    this.render()
  }

  clearScreen() {

  }


  renderWorldScreen() {
    this.createWorld()
    this.renderWorld()
    this.render()
  }

  createWorld() {
    this.worldView = new WorldView(this.root)
  }
  renderWorld() {
    this.activeScreen.destroy()
    this.root.innerHTML = null
    this.root.append(this.worldView.domElement)
    this.needsUpdate = true
    this.render()
  }
  createCharacters(characters: CharacterModel[]) {
    const tasks = characters.map(({name, className, race, gender}: CharacterModel) => {
      return {
        url: `assets/characters/${race}/${className}/${gender}/model.gltf`,
        name,
        onLoad: this.addCharacter.bind(this)
      }
    })
    this.loader.addBackgroundTask(tasks)
  }

  addCharacter(character: GLTF) {
    this.characters.push(character)
  }

  subscribe(observer: Observer) {
    this.subject.subscribe(observer)
  }

  unsubscribe(observer: Observer) {
    this.subject.unsubscribe(observer)
  }

  notify(action: Action) {
    this.subject.notify(action)
  }

  render() {
    if(!this.needsUpdate) return false
    requestAnimationFrame(this.render.bind(this))
    if (this.worldView) this.worldView.render(this.clock)
    if (this.characterInfo) this.characterInfo.render()
  }
}