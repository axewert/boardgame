import {BasicViewComponent} from "../BasicViewComponent";
import {UI} from "../../../typings/uiElementTypes";

import (/*webpackChunkName: 'button'*/'./styles.scss')

export class Button extends BasicViewComponent<UI.ButtonProps>{
  protected domElement: HTMLElement
  protected name = 'button'
  protected listeners: UI.Listener[]
  constructor(props: UI.ButtonProps) {
    super()
    this.init(props)
  }

  protected init(props: UI.ButtonProps) {
    super.init(props)
    this.addListeners(props)
  }

  protected html({modifiers, text, attributes, disabled, listeners}: UI.ButtonProps) {
    return `
      <button 
        class="button${modifiers ? this.createModifiers(modifiers) : ''}"
        ${disabled ? 'disabled' : ''} 
        ${attributes? this.createDataAttributes(attributes) : ''}
      >
        <span class="button__text">${text}</span>
        <span class="button__bg"></span>
      </button>
    `
  }
}
