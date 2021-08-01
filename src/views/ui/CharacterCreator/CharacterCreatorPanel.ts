import {BasicUiElement} from "../BasicUiElement";
import {Character} from "../../../typings/characterTypes";
import {Button} from "../Button/Button";

import (/*webpackChunkName: 'character-creator-panel'*/'./styles.scss')


export class CharacterCreatorPanel {
  private domElement: HTMLElement
  onClick: (e: MouseEvent) => void
  constructor(characters: Character.Data[], onClick: (e: MouseEvent) => void) {
    this.init(characters)
    this.onClick = onClick
  }

  init(characters: Character.Data[]) {
    this.domElement = BasicUiElement
      .createDomElement(this.html().trim())
    const classesSet = new Set(characters.map(char => char.className))
    classesSet.forEach(el => this.domElement.append(new Button(el).getDomElement()))
    this.domElement.onclick = e =>  this.handleClick(e)
  }

  handleClick(evt: MouseEvent) {
    this.onClick(evt)
  }

  html() {
    return `
      <div class="character-creator-panel"></div>
    `
  }

  getDomElement() {
    return this.domElement
  }
}