import {Action, ActionTypes} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {ControlPanel} from "../../components/ControlPanel/ControlPanel";
import {CharacterModel} from "../../../models/CharacterModel";
import {Button} from "../../components/Button/Button";
import {Menu} from "../../components/Menu/Menu";

export class NewCharacter {
  private container: BasicComponent
  private leftPanel: BasicComponent
  private topPanel: BasicComponent
  private buttons: BasicComponent[] = []
  private menu: BasicComponent
  private acceptButton: BasicComponent

  constructor(
    private root: HTMLElement,
    private evtHandler: (action: Action) => void,
  ) {
    this.init()
  }
  init() {
    this.container = new BasicComponent('<div class="new-character"></div>')
    this.topPanel = new BasicComponent(ControlPanel())
    this.acceptButton = new BasicComponent(Button({
      text: 'OK',
      modifiers: ['main', 'purple']
    }))
    this.acceptButton.addListeners({
      name: 'click',
      handler: this.handleAcceptButtonClick.bind(this)
    })
    this.topPanel.add(this.acceptButton)
    this.leftPanel = new BasicComponent(ControlPanel({
      modifiers: ['vertical']
    }))
    this.container.add(
      this.topPanel,
      this.leftPanel,
    )
  }
  open() {
    this.root.append(this.container.domElement)
  }
  close() {
    this.container.domElement.remove()
  }
  setButtons(characters: CharacterModel[]) {
    const buttonNames = characters.map(character => character.name)

    if (this.buttons) this.removeUnusedButtons(buttonNames)

    const isExist = (name: string) => this.buttons.find(btn => btn.name === name)
    characters.forEach(({name, className, id}) => {
      if (isExist(name)) return
      const button = new BasicComponent(
        Button({
          modifiers: ['round'],
          attributes: [{
            id: `${id}`
          }]
        }),
        name
      )
      button.add(new BasicComponent(
        `<span class="icon icon_${className}"></span>`
      ))
      button.addListeners({
        name: 'click',
        handler: this.handleButtonClick.bind(this)
      })
      this.buttons.push(button)
    })
    this.leftPanel.add(...this.buttons)
  }
  removeUnusedButtons(needed: string[]) {
    const isNeed = (name: string) => needed.includes(name)
    this.buttons = this.buttons.filter(button => {
      if (!isNeed(button.name)) {
        button.destroy()
        button.domElement.innerHTML = ''
        button.domElement.remove()
      }
      return isNeed(button.name)
    })
  }
  handleButtonClick(evt: Event) {
    const {id} = (evt.currentTarget as HTMLElement).dataset
    this.evtHandler({
      type: ActionTypes.NewActiveCharacterIsSelected,
      payload: id
    })
  }
  private handleAcceptButtonClick (evt: Event) {
    const {id} = (evt.currentTarget as HTMLElement).dataset
    this.evtHandler({
      type: ActionTypes.CharacterIsCreated,
      payload: id
    })
  }
}