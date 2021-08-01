import {CharacterInfoPreview} from "../CharacterInfoPreview/CharacterInfoPreview";
import {CharacterInfoCard} from "../CharacterInfoCard/CharacterInfoCard";
import {CharacterView} from "../../CharacterView";
import {CharacterModel} from "../../../models/CharacterModel";

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
  setCharacter(characterView: CharacterView, characterModel: CharacterModel) {
    this.characterInfoPreview.setCharacter(characterView)
    this.characterInfoCard.setCharacter(characterModel)
  }
  getDomElement() {
    return this.domElement
  }
  render() {
    this.characterInfoPreview.render()
  }
}