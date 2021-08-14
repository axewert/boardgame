import {Action} from "../../../typings/observerActionTypes";
import {BasicComponent} from "../../components/BasicComponent";
import {ControlPanel} from "../../components/ControlPanel/ControlPanel";
import {CharacterModel} from "../../../models/CharacterModel";
import {Button} from "../../components/Button/Button";

export class NewCharacter {
  container: BasicComponent
  panel: BasicComponent
  buttons: BasicComponent[] = []
  constructor(
    private root: HTMLElement,
    private evtHandler: (action: Action) => void,
  ) {
    this.init()
  }
  init() {
    this.container = new BasicComponent('<div class="new-character"></div>')
    this.panel = new BasicComponent(ControlPanel({
      modifiers: ['horizontal']
    }))
    this.container.add(
      this.panel
    )
  }
  open() {
    this.root.append(this.container.domElement)
  }
  close() {
    this.container.domElement.remove()
  }
  setButtons(characters: CharacterModel[]) {
    const buttonNames = characters.map(character => character.className)
    if (this.buttons) this.removeUnusedButtons(buttonNames)
    const isExist = (name: string) => this.buttons.find(btn => btn.name === name)
    buttonNames.forEach(name => {
      if (isExist(name)) return
      const button = new BasicComponent(
        Button({
          modifiers: ['round']
        }),
        name
      )
      button.add(new BasicComponent(
        `<span class="icon icon_${name}"></span>`
      ))
      this.buttons.push(button)
    })
    this.panel.add(...this.buttons)
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
}