import {BasicUiElement} from "../BasicUiElement";

import (/*webpackChunkName: 'button'*/'./styles.scss')
export class Button {
  private domElement: HTMLElement
  constructor(name: string) {
    this.init(name)
  }
  init(name: string) {
    this.domElement = BasicUiElement
      .createDomElement(this.html(name).trim())
  }
  html(name: string) {
    return `
       <div class="button">
        <div class="icon icon_${name}" data-charClass=${name}></div>
      </div>
    `
  }
  getDomElement() {
    return this.domElement
  }
}