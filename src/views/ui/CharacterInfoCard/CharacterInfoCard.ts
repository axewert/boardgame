import {BasicUiElement} from "../BasicUiElement";
import {SpellBook} from "../../../typings/spellBookTypes";
import {CharacterModel} from "../../../models/CharacterModel";
import {SpellCard} from "../SpellCard/SpellCard";
import (/*webpackChunkName: 'character-info-card'*/'./styles.scss')

export class CharacterInfoCard {
  domElement: HTMLElement
  cardsPlace: HTMLElement
  constructor() {
    this.init()
  }
  init() {
    this.domElement = BasicUiElement
      .createDomElement(this.html().trim())
    this.cardsPlace = this.domElement.querySelector('.js-cards-place')
  }
  createCard(spell: SpellBook.Spell<any>) {
    this.cardsPlace.append(new SpellCard(spell).getDomElement())
  }
  html() {
    return `
      <div class="character-info-card">
        <div class="character-info-card__cards js-cards-place"></div>
      </div>
    `
  }
  setCharacter(character: CharacterModel) {
    this.cardsPlace.innerHTML = ''
    character.spells.forEach(spell => {
      this.createCard(spell)
    })
  }
  getDomElement() {
    return this.domElement
  }
}