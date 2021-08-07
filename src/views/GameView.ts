import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer";
import {Action} from "../typings/observerActionTypes";
import {Subject} from "../utlis/observer/Subject";
import {CharacterView} from "./CharacterView";
import {CharacterModel} from "../models/CharacterModel";
import {WorldView} from "./WorldView";
import {StartScreen} from "./screens/StartScreen/StartScreen";
import {CreateNewGame} from "./screens/CreateNewGame/CreateNewGame";
import {CharacterInfo} from "./screens/CharacterInfo/CharacterInfo";

export class GameView {
  private readonly root: HTMLElement
  private readonly subject = new Subject()
  private readonly clock = new THREE.Clock()
  private activeCharacter: CharacterView
  private readonly characters: CharacterView[] = []
  private worldView: WorldView
  private needsUpdate = false
  private activeScreen: StartScreen | CreateNewGame
  private characterInfo: CharacterInfo
  constructor(root: HTMLElement) {
    this.root = root
  }

  renderStartScreen() {
    this.activeScreen = new StartScreen(this.root, this.notify.bind(this))
  }
  renderCreateNewGame() {
    this.activeScreen.destroy()
    this.root.innerHTML = null
    this.activeScreen = new CreateNewGame(this.root, this.notify.bind(this))
    this.characterInfo = new CharacterInfo(this.root, this.notify.bind(this))
  }
  renderCreateNewCharacter() {
    this.characterInfo.toggleVisible()
  }
  setActiveScreen() {

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

  }

  async getCharacter({name, className, race, gender}: CharacterModel) {
    const isExist = this.characters.find(char => {
      return char.name === name
    })
    if(isExist) return isExist
    const character =  await new CharacterView(name, className, race, gender).create()
    this.characters.push(character)
    return character
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
    if (this.activeCharacter) this.activeCharacter.render(this.clock.getDelta())

  }
}