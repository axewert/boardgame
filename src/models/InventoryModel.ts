import {Inventory} from "../typings/inventoryTypes";

export class InventoryModel {
  private readonly items: Inventory.Item[] = []
  addItem(item: Inventory.Item) {
    this.items.push(item)
  }
  removeItem() {}
}