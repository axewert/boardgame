import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {BasicScene} from "../../scenes/BasicScene";
import {Button} from "../../components/Button/Button";

export class CharacterInfo {
  container: BasicComponent
  characterPreview: BasicScene
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
    this.container.add(this.acceptButton)
    this.root.append(
      this.container.domElement,
    )
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
}