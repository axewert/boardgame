import {SpellBook} from './spellBookTypes'

export namespace Character {
  export interface Data {
    name: string
    className: string,
    race: string,
    gender: string
  }
  export interface Class {
    name: string
    resourceName: string
    healthPerLevel: number
    resourcePerLevel: number
    equipmentRequirements: string[]
    spells: number[]
  }
  export interface Position {
    world: string
    continent: string
    location: string
    region: string
    x: number
    y: number
    z: number
  }
  export interface Race {
    name: string,
    classes: string[],
    faction: string,
    position: Position
  }
}