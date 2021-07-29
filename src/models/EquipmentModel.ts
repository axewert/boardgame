import {Inventory} from "../typings/inventoryTypes";
import {Equipment} from "../typings/equipmentTypes";

export class EquipmentModel {
  requirements: string[]
  constructor(requirements: string[]) {
    this.requirements = requirements
  }
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
  isValid(req: string) {
    return this.requirements.includes(req) || req === 'any'
  }
  addItem(item: Inventory.Item) {
    if (this.isValid(item.kind)) {
      this.slots[item.slot as keyof Equipment.Slots] = item
    }
  }
}