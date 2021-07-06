import {Game} from "./typings/typings";

export class Inventory implements Game.Hero.Inventory{
  private readonly rangeReq: string[]
  private readonly meleeReq: string[]
  private readonly accessoryReq: string[]
  private readonly armorReq: string[]
  range: string
  melee: string
  accessory: string
  armor: string
  constructor(initialState: Game.Hero.Inventory, requirements: Game.Hero.InventoryRequirements) {
    this.range = initialState.range
    this.melee = initialState.melee
    this.accessory = initialState.accessory
    this.armor = initialState.armor
    this.rangeReq = requirements.range
    this.meleeReq = requirements.melee
    this.accessoryReq = requirements.accessory
    this.armorReq = requirements.armor
  }
}