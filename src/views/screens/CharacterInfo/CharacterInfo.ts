import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {Button} from "../../components/Button/Button";
import {CharacterInfoPreview} from "../../scenes/CharacterInfoPreview/CharacterInfoPreview";
import * as THREE from 'three'
import {CharacterScene} from "../../scenes/CharacterScene/CharacterScene";

export class CharacterInfo {
  container: BasicComponent
  characterPreview = new CharacterInfoPreview(300, 600)
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }
  init() {
    this.container = new BasicComponent('<div class="character-info character-info_alliance"></div>')
    this.container.domElement.append(
      this.characterPreview.domElement
    )
  }
  open() {
    this.root.append(
      this.container.domElement,
    )
  }
  close() {
    this.container.domElement.remove()
  }

  set character(character: CharacterScene) {
    this.characterPreview.character = character
  }
  destroy() {
    this.container.destroy()
  }
  render(delta: number) {
    this.characterPreview.render(delta)
  }
}