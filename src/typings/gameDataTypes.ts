import {Character} from "./characterTypes";
import {Inventory} from "./inventoryTypes";
import {SpellBook} from "./spellBookTypes";

export interface GameData {
  characters: Character.Data[]
  items: Inventory.Item[]
  spells: SpellBook.Spell<string>[]
  classes: Character.Class[]
}