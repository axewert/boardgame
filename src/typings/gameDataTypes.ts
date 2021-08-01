import {Character} from "./characterTypes";
import {Inventory} from "./inventoryTypes";
import {SpellBook} from "./spellBookTypes";
import {CharacterModel} from "../models/CharacterModel";

export interface GameData {
  characters: Character.Data[]
  items: Inventory.Item[]
  spells: SpellBook.Spell<string>[]
  classes: Character.Class[]
  races: Character.Race[]
}
export interface Player<T> {
  player: 'player' | 'computer'
  characters: T[]
}