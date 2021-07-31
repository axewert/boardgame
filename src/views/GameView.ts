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

export class GameView {
  root: HTMLElement
  subject = new Subject()
  characterInfo: CharacterInfo
  clock = new THREE.Clock()
  activeCharacter: CharacterView
  characters: CharacterView[] = []
  constructor(root: HTMLElement) {
    this.root = root
    this.init()
  }
  init() {
    this.characterInfo = new CharacterInfo(this.root)
  }

  renderCharacterCreatorScreen(className: string, race: string) {
    this.root.appendChild(this.characterInfo.getDomElement())
    this.render()
    this.getCharacter(className,race).then(char => {
      this.activeCharacter = char
      this.characterInfo.setCharacter(this.activeCharacter)
    })
  }
  async getCharacter(className: string, race: string) {
    const isExist = this.characters.find(char => {
      return char.className === className && char.race === race
    })
    if(isExist) return isExist
    return await new CharacterView(className, race).create()
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