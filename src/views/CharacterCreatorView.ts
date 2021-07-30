import {ButtonExpandable} from "./ui/ButtonExpandable";

export class CharacterCreatorView {
  html() {
    return `
      <div class="character-creator">
    <div class="character-creator__header">
      <div class="character-creator__panel">
        <div class="button">
          <div class="icon logo_faction logo_alliance"></div>
        </div>
        <div class="button">
          <div class="icon logo_faction logo_horde"></div>
        </div>
      </div>
    </div>
    <div class="character-creator__body">
      <div class="character-creator__panel character-creator__panel_vertical">
        ${ButtonExpandable.html('druid')}
      </div>
      <div class="character-creator__panel character-creator__panel_vertical"></div>
    </div>
    <div class="character-creator__footer"></div>
  </div>

    `
  }
}