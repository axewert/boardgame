import * as THREE from 'three'
import {Observer} from "../utlis/observer/Observer";
import {Action} from "../typings/observerActionTypes";
import {Subject} from "../utlis/observer/Subject";
import {Character} from "../typings/characterTypes";
import {CharacterInfo} from "./ui/CharacterInfo/CharacterInfo";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {CharacterInfoPreview} from "./ui/CharacterInfoPreview/CharacterInfoPreview";
import {CharacterView} from "./CharacterView";
import {CharacterCreatorPanel} from "./ui/CharacterCreator/CharacterCreatorPanel";

export class GameView {
  root: HTMLElement
  subject = new Subject()
  characterInfo: CharacterInfo
  clock = new THREE.Clock()
  activeCharacter: CharacterView
  characters: CharacterView[] = []
  characterCreator: CharacterCreatorPanel
  backup: Character.Data[]
  constructor(root: HTMLElement) {
    this.root = root
    this.init()
  }
  init() {
    this.characterInfo = new CharacterInfo(this.root)
  }

  renderCharacterCreatorScreen(characters: Character.Data[], classes: Character.Class[], races: Character.Race[]) {

    this.backup = characters

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
  setActiveCharacter(character: Character.Data) {
    this.getCharacter(character).then(char => {
      this.activeCharacter = char
      this.characterInfo.setCharacter(this.activeCharacter)
    })
  }
  handleCreatorPanelClick(e: MouseEvent) {
    const className = (e.target as HTMLElement).dataset.charclass
    const char = this.backup.find(char => char.className === className)
    this.setActiveCharacter(char)
  }

  async getCharacter({name, className, race, gender}: Character.Data) {
    const isExist = this.characters.find(char => {
      return char.name === name
    })
    if(isExist) return isExist
    return await new CharacterView(name, className, race, gender).create()
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
    this.characterInfo.render()
    if (this.activeCharacter) this.activeCharacter.render(this.clock.getDelta())
  }
}