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
    }
    export interface Instance extends Hero.Data{
      level: number
      exp: number
      money: number
      //TODO change type of inventory, spell book, dices
      inventory: any[]
      spellBook: any[]
      dices: any[]
    }
  }
}
