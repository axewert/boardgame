import {Menu} from "../../components/Menu/Menu";
import {Button} from "../../components/Button/Button";
import {BasicComponent} from "../../components/BasicComponent";
import {Action, ActionTypes} from "../../../typings/observerActionTypes";

export class StartScreen {
  menu: BasicComponent
  buttons: BasicComponent[] = []
  components: BasicComponent[]
  constructor(private root: HTMLElement, private evtHandler: (action: Action) => void) {
    this.init()
  }

  init() {
    const buttons = [
      {text: 'новая игра', modifiers: ['main', 'purple'], attributes: [{type: 'new-game'}]},
      {text: 'загрузить игру', modifiers: ['main', 'purple'], disabled: true}
    ]
    buttons.forEach(parameters => {
      const button = new BasicComponent(Button(parameters))
      button.addListeners({
        name: 'click',
        handler: this.onMenuButtonClick.bind(this)
      })
      this.buttons.push(button)
    })

    this.menu = new BasicComponent(Menu()).add(...this.buttons)

    this.root.append(
      this.menu.domElement
    )
  }
  onMenuButtonClick(evt: Event) {
    this.evtHandler({
      type: ActionTypes.NewGameButtonIsClicked
    })
  }
  destroy() {
    this.menu.destroy()
  }
}