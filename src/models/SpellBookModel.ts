import {SpellBook} from "../typings/spellBookTypes";
import {Creature} from "../typings/creatureTypes";
import SpellActionFn = SpellBook.SpellActionFn;
import SpellActionKeys = SpellBook.SpellActionKeys;
import SpellActionTypes = SpellBook.SpellActionTypes;

export class SpellBookModel {
  spells: SpellBook.Spell<SpellActionFn>[]
  constructor(spells: SpellBook.Spell<string>[]) {
    this.init(spells)
  }
  init(spells: SpellBook.Spell<string>[]) {
    this.spells = spells.map(spell => {
      const action = this.parseSpellAction(spell)
      return {...spell, action} as SpellBook.Spell<SpellActionFn>
    })
  }
  parseSpellAction(spell: SpellBook.Spell<string>) {
    const keys = spell.action.split(' ')
    let fn
    switch (keys[SpellActionKeys.type]) {
      case SpellActionTypes.regain: {
        fn = (target: Creature) => {
          target.setHealth(+keys[SpellActionKeys.amount], keys[SpellActionKeys.type])
        }
        break
      }
    }
    return fn
  }
  getSpellById(id: number) {
    return this.spells.find(spell => spell.id === id)
  }
}