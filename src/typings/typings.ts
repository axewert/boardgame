export namespace Game {
  export interface Tile {
    name: string
    creatures: Creature[]
  }
  export interface Creature {
    name: string
  }
  export interface Hero {
    name: string
    level: number
    exp: number
    health: number
    money: number
    //TODO change type of inventory, spell book, dices
    inventory: any[]
    spellBook: any[]
    dices: any[]
  }

}