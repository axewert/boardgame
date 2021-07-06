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
      inventory: {
        initialState: Inventory
        requirements: InventoryRequirements
      }
    }
    export interface Instance extends Hero.Data{
      level: number
      exp: number
      money: number
      //TODO change type of inventory, spell book, dices
      inventory: any
      spellBook: any[]
      dices: any[]
    }
    export interface InventoryRequirements {
      range: string[]
      melee: string[]
      accessory: string[]
      armor: string[]
    }
    export interface Inventory {
      range: string
      melee: string
      accessory: string
      armor: string
    }
  }
}
