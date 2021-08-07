import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {BasicScene} from "../../scenes/BasicScene";
import {Button} from "../../components/Button/Button";

export class CharacterInfo {
  characterInfoContainer: BasicComponent
  characterPreview: BasicScene
  acceptButton: BasicComponent
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }
  init() {
    this.characterInfoContainer = new BasicComponent('<div class="character-info character-info_hidden"></div>')
    this.acceptButton = new BasicComponent(Button({
      text: 'OK',
      modifiers: ['main', 'purple']
    }))
    this.acceptButton.addListeners({
      name: 'click',
      handler: this.handleAcceptButtonClick.bind(this)
    })
    this.characterInfoContainer.add(this.acceptButton)
    this.root.append(
      this.characterInfoContainer.domElement,
    )
  }
  toggleVisible() {
    this.characterInfoContainer.domElement.classList.toggle('character-info_hidden')
  }
  handleAcceptButtonClick() {
    this.evtHandler({
      type: ActionTypes.CharacterIsCreated
    })
  }
  destroy() {

  }
}