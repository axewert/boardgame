import {CharacterInfoPreview} from "../ui/CharacterInfoPreview/CharacterInfoPreview";
import {CharacterInfoCard} from "../ui/CharacterInfoCard/CharacterInfoCard";
import {CharacterView} from "../CharacterView";
import {CharacterModel} from "../../models/CharacterModel";
import {BasicViewComponent} from "../ui/BasicViewComponent";
import {BasicView} from "../ui/BasicView";

import (/*webpackChunkName: 'character-info'*/'./styles.scss')

export class CharacterInfoView extends BasicView {
  protected name = 'character-info'
  protected domElement: HTMLElement
  protected components: any[] = []
  constructor() {
    super()
  }
  init() {
    super.init()
    this.addComponents()
  }

  getDomElement() {
    return this.domElement
  }
  protected html() {
    return `
      <div class="${this.name}"></div>
    `
  }
}