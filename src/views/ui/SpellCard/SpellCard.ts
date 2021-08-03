import {SpellBook} from "../../../typings/spellBookTypes";
import {BasicUiElement} from "../BasicUiElement";
import (/*webpackChunkName: 'spell-card'*/'./styles.scss')

export class SpellCard {
  domElement: HTMLElement
  constructor(spell: SpellBook.Spell<any>) {
    this.init(spell)
  }
  init(spell: SpellBook.Spell<any>) {
    this.domElement = BasicUiElement.createDomElement(this.html(spell))
  }
  html({name, description}: SpellBook.Spell<any>) {
    const title = name.split('_').join(' ')
    return `
      <div class="card">
        <div class="card__bg"></div>
        <div class="card__image"></div>
        <div class="card__text">${description}</div>
        <svg class="text-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248.91 17.91"><defs><style>.cls-1{fill:none;stroke:none;stroke-miterlimit:10;}</style></defs><title>text-curve</title><path id="text-curve" class="cls-1" d="M5.87,29A483.92,483.92,0,0,1,126.15,12.08,488.06,488.06,0,0,1,254.52,27" transform="translate(-5.74 -11.52)"/>
          <text style="font-size: 16px;font-family: 'Gabriela', serif;stroke: none;fill: white;font-weight: bold">
            <textPath xlink:href="#text-curve" startOffset="50%" text-anchor="middle">
              ${title}
            </textPath>
          </text>
        </svg>
      </div>
    `
  }
  getDomElement() {
    return this.domElement
  }
}