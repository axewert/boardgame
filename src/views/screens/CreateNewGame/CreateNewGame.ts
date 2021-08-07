import {BasicComponent} from "../../components/BasicComponent";
import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {Button} from "../../components/Button/Button";

export class CreateNewGame {
  sections: BasicComponent[] = []
  addNewCharacter: BasicComponent[] = []
  acceptButton: BasicComponent
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }
  init() {
    ['alliance', 'horde'].forEach(faction => {
      const section = new BasicComponent(this.section(faction))
      const addCharacter = new BasicComponent(this.addCharacter())
      section.add(addCharacter)
      addCharacter.addListeners({
        name: 'click',
        handler: this.handleAddNewCharacterClick.bind(this)
      })
      this.sections.push(section)
      this.addNewCharacter.push(addCharacter)
    })
    this.acceptButton = new BasicComponent(
      Button({text: 'accept', modifiers: ['main', 'green']})
    )
    this.acceptButton.addListeners({
      name: 'click',
      handler: this.handleAcceptNewGame.bind(this)
    })
    this.root.append(
      ...this.sections.map(section => section.domElement),
      this.acceptButton.domElement
    )
  }
  addCharacter() {
    return `
      <div class="create-game__add-character"></div>
    `
  }
  section(mod: string) {
    const name = 'create-game__section'
    return `
      <section class="${name} ${name}_${mod}">
    `
  }
  handleAddNewCharacterClick(evt: Event) {
    this.evtHandler({
      type: ActionTypes.NewCharacterButtonIsClicked
    })
  }
  handleAcceptNewGame() {
    this.evtHandler({
      type: ActionTypes.NewGameIsAccepted
    })
  }
  destroy() {
    this.addNewCharacter.forEach(el => el.destroy())
  }
}
