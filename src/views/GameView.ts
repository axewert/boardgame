import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
import {Subject} from "../utlis/observer/Subject";
import {CharacterInfo} from "./ui/CharacterInfo/CharacterInfo";
import {CharacterView} from "./CharacterView";
import {CharacterModel} from "../models/CharacterModel";
import {CharacterCreatorPanel} from "./ui/CharacterCreator/CharacterCreatorPanel";
import {WorldView} from "./WorldView";

export class GameView {
  root: HTMLElement
  subject = new Subject()
  characterInfo: CharacterInfo
  clock = new THREE.Clock()
  activeCharacter: CharacterView
  characters: CharacterView[] = []
  characterCreator: CharacterCreatorPanel
  worldView: WorldView
  activeView: WorldView | CharacterInfo
  constructor(root: HTMLElement) {
    this.root = root
    this.init()
  }
  init() {

  }

  renderCharacterCreatorScreen(characters: CharacterModel[]) {
    this.characterInfo = new CharacterInfo(this.root)
    this.characterCreator = new CharacterCreatorPanel(
      characters,
      this.handleCreatorPanelClick.bind(this)
    )

    this.root.append(
      this.characterInfo.getDomElement(),
      this.characterCreator.getDomElement()
    )

    this.render()
    this.setActiveCharacter(characters[0])
  }
  renderMainGameScreen() {
    this.createWorld()
    this.renderWorld()
    this.render()
  }
  createWorld() {
    this.worldView = new WorldView(this.root)
  }
  renderWorld() {
    this.activeView = this.worldView
  }
  updateWorld() {

  }
  setActiveCharacter(character: CharacterModel) {
    this.getCharacter(character).then(char => {
      this.activeCharacter = char
      this.characterInfo.setCharacter(this.activeCharacter, character)
    })
  }

  handleCreatorPanelClick(e: MouseEvent) {
    const className = (e.target as HTMLElement).dataset.charclass
    if(className === this.activeCharacter.className) return false
    this.notify({
      type: ActionTypes.ViewClassControlIsClicked,
      payload: {
        className
      }
    })
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
    requestAnimationFrame(this.render.bind(this))
    this.activeView.render()
    if (this.activeCharacter) this.activeCharacter.render(this.clock.getDelta())
  }
}