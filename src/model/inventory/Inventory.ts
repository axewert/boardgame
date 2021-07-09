import {Game} from "../../typings/typings";

export class Inventory {
  requirements: Game.Inventory.Requirements
  items: Game.Inventory.Item[]
  constructor({items, requirements}: Game.Inventory.Data) {
    this.items = items
    this.requirements = requirements
    console.log(this.items)
  }
}