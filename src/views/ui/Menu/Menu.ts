import {BasicViewComponent} from "../BasicViewComponent";
import {UI} from "../../../typings/uiElementTypes";
import {Button} from "../Button/Button";
import (/*webpackChunkName: 'menu'*/'./styles.scss')

export class Menu extends BasicViewComponent<any> {
  protected name = 'menu'
  protected domElement: HTMLElement
  components: BasicViewComponent<any>[] = []

  constructor(props: UI.MenuProps) {
    super()
    this.init(props)
  }
  protected init({buttons, listeners}: UI.MenuProps) {
    super.init()
    buttons.forEach(btn => {
      this.components.push(new Button({...btn, listeners}))
    })
    this.addComponents()
  }

  protected html() {
    return `
      <div class="${this.name}"></div>
    `
  }
}