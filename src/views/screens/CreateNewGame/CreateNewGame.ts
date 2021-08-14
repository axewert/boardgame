import {BasicComponent} from "../../components/BasicComponent";
import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {Button} from "../../components/Button/Button";
import {ControlPanel} from "../../components/ControlPanel/ControlPanel";

export class CreateNewGame {
  sections: BasicComponent[] = []
  addNewCharacter: BasicComponent[] = []
  acceptButton: BasicComponent
  container: BasicComponent
  topPanel: BasicComponent
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }
  init() {
    this.container = new BasicComponent('<div class="create-game"></div>')
    this.topPanel = new BasicComponent(ControlPanel())
    this.acceptButton = new BasicComponent(
      Button({text: 'accept', modifiers: ['main', 'green']})
    )
    this.acceptButton.addListeners({
      name: 'click',
      handler: this.handleAcceptNewGame.bind(this)
    })
    this.topPanel.add(this.acceptButton);
    ['alliance', 'horde'].forEach(faction => {
      const section = new BasicComponent(this.section(faction))
      const addCharacter = new BasicComponent(
        this.addCharacter({
          name: 'faction',
          value: faction
        })
      )
      section.add(addCharacter)
      addCharacter.addListeners({
        name: 'click',
        handler: this.handleAddNewCharacterClick.bind(this)
      })
      this.sections.push(section)
      this.addNewCharacter.push(addCharacter)
    })

    this.container.add(this.sections[0],this.topPanel,this.sections[1])
    this.root.append(
      this.container.domElement
    )
  }
  addCharacter(attribute: {name: string, value: string}) {
    return `
      <div class="create-game__add-character" data-${attribute.name}="${attribute.value}"></div>
    `
  }
  section(mod: string) {
    const name = 'create-game__section'
    return `
      <section class="${name} ${name}_${mod}">
    `
  }
  handleAddNewCharacterClick(evt: Event) {
    const {faction} = (evt.target as HTMLElement).dataset
    this.evtHandler({
      type: ActionTypes.NewCharacterButtonIsClicked,
      payload: faction
    })
  }
  handleAcceptNewGame() {
    this.evtHandler({
      type: ActionTypes.NewGameIsAccepted
    })
  }
  destroy() {
    this.container.destroy()
  }
}
