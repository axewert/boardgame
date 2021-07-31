import {BasicUiElement} from "../BasicUiElement";
import (/*webpackChunkName: 'character-info-card'*/'./styles.scss')

export class CharacterInfoCard {
  domElement: HTMLElement
  constructor() {
    this.init()
  }
  init() {
    this.domElement = BasicUiElement
      .createDomElement(this.html().trim())
  }

  html() {
    return `
      <div class="character-info-card"></div>
    `
  }

  getDomElement() {
    return this.domElement
  }
}