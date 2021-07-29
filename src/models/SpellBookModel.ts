import {SpellBook} from "../typings/spellBookTypes";
import {CharacterModel} from "./CharacterModel";
import SpellActionFn = SpellBook.SpellActionFn;
import {Creature} from "../typings/creatureTypes";

export class SpellBookModel {
  spells: SpellBook.Spell<SpellActionFn>[]
  constructor(spells: SpellBook.Spell<string>[]) {
    this.init(spells)
  }
  init(spells: SpellBook.Spell<string>[]) {
    const action = (target: Creature) => target.increaseHealth()
    this.spells = spells.map(spell => {
      this.parseSpellAction(spell)
      return {...spell, action} as SpellBook.Spell<SpellActionFn>
    })
  }
  parseSpellAction(spell: SpellBook.Spell<string>) {
    console.log(spell)
  }
  getSpellById(id: number) {
    return this.spells.find(spell => spell.id === id)
  }
}