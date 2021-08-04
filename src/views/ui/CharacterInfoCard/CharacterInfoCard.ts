import {BasicViewComponent} from "../BasicViewComponent";
import {SpellBook} from "../../../typings/spellBookTypes";
import {CharacterModel} from "../../../models/CharacterModel";
import {Card} from "../SpellCard/Card";
import (/*webpackChunkName: 'character-info-card'*/'./styles.scss')

export class CharacterInfoCard extends BasicViewComponent<any>{
  protected domElement: HTMLElement
  protected name = 'character-info-card'
  private cardsPlace: HTMLElement

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
      // this.createCard(spell)
    })
  }
}