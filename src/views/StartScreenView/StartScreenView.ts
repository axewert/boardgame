import {BasicViewComponent} from "../ui/BasicViewComponent";
import {UI} from "../../typings/uiElementTypes";
import {Menu} from "../ui/Menu/Menu";
import {BasicView} from "../ui/BasicView";

import (/*webpackChunkName: 'start-screen'*/'./styles.scss')

export class StartScreenView extends BasicView {
  protected domElement: HTMLElement
  protected name = 'start-screen'
  protected components: BasicViewComponent<any>[] = []
  constructor(props: UI.StartScreenProps) {
    super()
    this.init(props)
  }
  protected init({listeners}: UI.StartScreenProps) {
    super.init()
    this.components
      .push(
        new Menu({
          buttons: [
            {text: 'новая игра', modifiers: ['main', 'purple'], attributes: [{type: 'new-game'}]},
            {text: 'загрузить игру', modifiers: ['main', 'purple'], disabled: true}
          ],
          listeners
        })
      )
    this.addComponents()
  }

  protected html() {
    return `
      <div class="${this.name}"></div>
    `
  }
}