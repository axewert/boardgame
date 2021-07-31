import {CharacterInfoPreview} from "../CharacterInfoPreview/CharacterInfoPreview";
import {CharacterInfoCard} from "../CharacterInfoCard/CharacterInfoCard";

import (/*webpackChunkName: 'character-info'*/'./styles.scss')

export class CharacterInfo {
  characterInfoPreview: CharacterInfoPreview
  characterInfoCard: CharacterInfoCard
  domElement: HTMLElement
  constructor(private root: HTMLElement) {
    this.init()
  }
  init() {
    this.characterInfoPreview = new CharacterInfoPreview()
    this.characterInfoCard = new CharacterInfoCard()

    this.domElement = document.createElement('div')
    this.domElement.classList.add('character-info')
    this.domElement.append(
      this.characterInfoPreview.getDomElement(),
      this.characterInfoCard.getDomElement()
    )
  }
  getDomElement() {
    return this.domElement
  }
  render() {
    this.characterInfoPreview.render()
  }
}