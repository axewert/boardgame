export namespace Game {

  export namespace Location {
    export interface Data {
      name: string
      zones: Zone[]
    }
    export interface Instance extends Location.Data {
      getNearestZones(currentZone: number, radius?:number ):number[]
    }
  }
  export interface Zone {
    name: string
    neighbours: number[]
  }
  export interface Creature {
    name: string
  }
  export namespace Hero {
    export namespace Classes {
      export const WARRIOR = 'warrior'
    }
    export interface Data {
      name: string
      heroClass: string
      health: number
      energy: number
      faction: string
      inventory: Inventory.Data
    }
    export interface Instance extends Hero.Data{
      level: number
      exp: number
      money: number
      //TODO change type of inventory, spell book, dices
      spellBook: any[]
      dices: any[]
    }
  }
  export namespace Inventory {
    export type ItemKind = 'range' | 'melee'
    export type ItemType = 'bow'
    export interface Item {
      name: string
      kind: string
      type: string
      level: number
      cost: number
      energy: number
      description: string
    }
    export interface Instance {
      items: Inventory.Item[]
      requirements: Requirements
    }
    export interface Requirements {
      
    }
    export interface Data extends Inventory.Instance{
      requirements: Requirements
    }
  }
}
