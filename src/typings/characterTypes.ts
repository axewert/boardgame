import {SpellBook} from "./spellBookTypes";

export namespace Character {
  export interface Data {
    name: string
    currentHealth: number
    currentResource: number
    inventory: number[]
    spells: SpellBook.Spell<string>[]
    race: string
    characterClass:string
    level?: number
    exp?: number
  }
  export interface Class {
    name: string
    resourceName: string
    healthPerLevel: number
    resourcePerLevel: number
    equipmentRequirements: string[]
  }
}