import {Character} from "../typings/characterTypes";
import {InventoryModel} from "./InventoryModel";
import {Inventory} from "../typings/inventoryTypes";
import {EquipmentModel} from "./EquipmentModel";

export class CharacterModel {
  private readonly name: string
  private readonly level: number = 1
  private readonly exp: number = 0
  private readonly health: number
  private readonly resource: number
  private readonly resourceName: string
  private readonly equipment = new EquipmentModel()
  private readonly inventory = new InventoryModel()
  constructor(data: Character.Data) {
    this.name = data.name
    this.level = data.level || this.level
    this.exp = data.exp || this.exp
    this.health = data.health
    this.resource = data.resource
    this.resourceName = data.resourceName
  }
  addItem(item: Inventory.Item) {
    this.inventory.addItem(item)
  }
  equipItem(id: number) {
    this.equipment.addItem(this.inventory.getItemById(id))
  }
}