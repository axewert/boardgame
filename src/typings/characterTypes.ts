import {SpellBook} from "./spellBookTypes";

export namespace Character {
  export interface Data {
    name: string
    health: number
    resource: number
    resourceName: string
    inventory: number[]
    spells: SpellBook.Spell[]
    race: string
    class:string
    level?: number
    exp?: number
  }
}