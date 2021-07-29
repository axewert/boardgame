import {SpellBook} from "../typings/spellBookTypes";
import {Creature} from "../typings/creatureTypes";

export class SpellModel {
  state: (target: Creature) => void
  constructor(spell: SpellBook.Spell<string>) {
    this.init(spell)
  }
  private init(spell: SpellBook.Spell<string>) {

  }
  regainHealth() {

  }

}