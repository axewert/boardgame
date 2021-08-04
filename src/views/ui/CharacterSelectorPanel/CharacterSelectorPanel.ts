import {BasicViewComponent} from "../BasicViewComponent";
import {Character} from "../../../typings/characterTypes";
import {Button} from "../Button/Button";
import {CharacterModel} from "../../../models/CharacterModel";
import {UI} from "../../../typings/uiElementTypes";

import (/*webpackChunkName: 'character-creator-panel'*/'./styles.scss')


export class CharacterSelectorPanel extends BasicViewComponent<UI.CharacterSelectorPanelProps>{
  protected domElement: HTMLElement
  protected name = 'character-selector-panel'
  private readonly onClick: (e: MouseEvent) => void
  constructor(props: UI.CharacterSelectorPanelProps) {
    super()
    this.onClick = props.onClick
  }

  private handleClick(evt: MouseEvent) {
    this.onClick(evt)
  }

  html() {
    return `
      <div class="character-creator-panel"></div>
    `
  }
}