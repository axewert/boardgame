import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer"
import {Action} from "../typings/observerActionTypes"
import {Subject} from "../utlis/observer/Subject"
import {CharacterModel} from "../models/CharacterModel"
import {StartScreen} from "./screens/StartScreen/StartScreen"
import {CreateNewGame} from "./screens/CreateNewGame/CreateNewGame"
import {CharacterInfo} from "./screens/CharacterInfo/CharacterInfo"
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader"
import {Loader} from "../utlis/loader/Loader"
import {NewCharacter} from "./screens/NewCharacter/NewCharacter";
import {CharacterScene} from "./scenes/CharacterScene/CharacterScene";
import {WorldScene} from "./scenes/WorldScene/WorldScene";

export class GameView {
  private readonly root: HTMLElement
  private readonly subject = new Subject()
  private readonly clock = new THREE.Clock()
  private characters: CharacterScene[] = []
  private worldScene: WorldScene
  private needsUpdate = false
  private activeScreen: StartScreen | CreateNewGame
  private characterInfo: CharacterInfo
  private newCharacter: NewCharacter
  private readonly loader = new Loader()
  private activeCharacter: CharacterModel
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
    this.newCharacter = new NewCharacter(this.root, this.notify.bind(this))
    this.createCharacters(characters)
  }
  openNewCharacterScreen() {

  }
  private async checkIfLoaded(characters: CharacterModel[]) {
    const names = this.characters.map(char => char.scene.name)
    const notLoaded = characters.filter(char => !names.includes(char.name))
    if (!notLoaded) return true
    return this.loader.loadNow(notLoaded.map(character => {
      const {name, className, race, gender} = character
      return {
        url: `assets/characters/${race}/${className}/${gender}/model.gltf`,
        name,
        onLoad: this.addCharacter.bind(this)
      }
    }))
  }
  openCreateNewCharacter(characters: CharacterModel[], activeCharacter: CharacterModel) {
    this.characterInfo.character = this.getCharacterByName(activeCharacter.name)
    this.newCharacter.setButtons(characters)
    this.characterInfo.open()
    this.newCharacter.open()
    this.needsUpdate = true
    this.render()
  }
  closeCreateNewCharacter() {
    this.characterInfo.close()
    this.newCharacter.close()
    this.needsUpdate = false
  }

  clearScreen() {

  }


  renderWorldScreen(character: CharacterModel) {
    this.createWorld()
    this.renderWorld()
    this.worldScene.setCharacter(this.getCharacterByName(character.name))
    this.render()
  }

  createWorld() {
    this.worldScene = new WorldScene(this.root)
  }
  renderWorld() {
    this.activeScreen.destroy()
    this.root.innerHTML = null
    this.root.append(this.worldScene.domElement)
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
    this.characters.push(new CharacterScene(character))
  }
  setActiveCharacter({name}: CharacterModel) {
    this.characterInfo.character = this.getCharacterByName(name)
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
  getCharacterByName(name: string) {
    return this.characters.find(character => character.scene.name === name)
  }
  render() {
    const delta = this.clock.getDelta()
    if(!this.needsUpdate) return false
    requestAnimationFrame(this.render.bind(this))
    if (this.worldScene) this.worldScene.render(this.clock)
    if (this.characterInfo) this.characterInfo.render(delta)
  }
}