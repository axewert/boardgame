import {Game} from "./typings/typings";
import Classes = Game.Hero.Classes;
import {Inventory} from "./Inventory";

export class Hero implements Game.Hero.Instance{
  name: string
  heroClass: string = Classes.WARRIOR
  dices: any[]
  exp: number = 0
  health: number
  inventory: any
  level: number = 1
  money: number = 6
  spellBook: any[] = []
  energy: number
  faction: string
  _location: Game.Location.Instance
  _zone: number
  constructor({name, energy, health, heroClass, faction, inventory}:Game.Hero.Data) {
    this.name = name
    this.heroClass = heroClass
    this.health = health
    this.energy = energy
    this.faction = faction
    this.inventory = new Inventory(inventory)
  }
  set location(location: Game.Location.Instance) {
    this._location = location
  }
  set zone(zone: number) {
    this._zone = zone
  }
}