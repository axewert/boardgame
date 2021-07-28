import {Inventory} from "../typings/inventoryTypes";
import {Equipment} from "../typings/equipmentTypes";

export class EquipmentModel {
  slots: Equipment.Slots = {
    back: null,
    chest: null,
    feet: null,
    finger: null,
    hands: null,
    head: null,
    legs: null,
    mainHand: null,
    neck: null,
    offHand: null,
    ranged: null,
    shoulder: null,
    trinketFirst: null,
    trinketSecond: null,
    waist: null,
    wrist: null
  }
  addItem(item: Inventory.Item) {
    this.slots[item.slot as keyof Equipment.Slots] = item
  }
}