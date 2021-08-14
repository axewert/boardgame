import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {Button} from "../../components/Button/Button";
import {CharacterInfoPreview} from "../../scenes/CharacterInfoPreview/CharacterInfoPreview";
import * as THREE from 'three'

export class CharacterInfo {
  container: BasicComponent
  characterPreview = new CharacterInfoPreview(300, 600)
  acceptButton: BasicComponent
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }
  init() {
    this.container = new BasicComponent('<div class="character-info character-info_alliance"></div>')
    this.acceptButton = new BasicComponent(Button({
      text: 'OK',
      modifiers: ['main', 'purple']
    }))
    this.acceptButton.addListeners({
      name: 'click',
      handler: this.handleAcceptButtonClick.bind(this)
    })
    this.container.domElement.append(
      this.characterPreview.domElement
    )
    this.container.add(this.acceptButton)
    this.root.append(
      this.container.domElement,
    )
  }

  set character(character: THREE.Group) {
    this.characterPreview.character = character
  }

  toggleVisible() {
    this.container.domElement.classList.toggle('character-info_visible')
  }
  handleAcceptButtonClick() {
    this.evtHandler({
      type: ActionTypes.CharacterIsCreated
    })
  }
  destroy() {
    this.container.destroy()
  }
  render() {
    this.characterPreview.render()
  }
}