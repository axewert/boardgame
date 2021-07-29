import {Inventory} from "./inventoryTypes";

export namespace Equipment {
  export type Slots = {
    [key in Inventory.ItemSlotTypes]: Inventory.Item
  }
}