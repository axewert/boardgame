import {Character} from "../typings/characterTypes";
import {InventoryModel} from "./InventoryModel";
import {Inventory} from "../typings/inventoryTypes";
import {EquipmentModel} from "./EquipmentModel";
import {SpellBookModel} from "./SpellBookModel";
import {SpellBook} from "../typings/spellBookTypes";
import {CharacterClassModel} from "./CharacterClassModel";
import SpellActionTypes = SpellBook.SpellActionTypes;
import {CharacterPositionModel} from "./CharacterPositionModel";


export class CharacterModel {
  private readonly name: string
  private readonly level: number = 1
  private readonly exp: number = 0
  private currentHealth: number
  private currentResource: number
  private readonly equipment: EquipmentModel
  private readonly inventory = new InventoryModel()
  private readonly spellBook: SpellBookModel
  private readonly characterClass: CharacterClassModel
  private readonly position: CharacterPositionModel
  constructor(
    data: Character.Data,
    characterClass: CharacterClassModel,
    spellBook: SpellBookModel,
    position: CharacterPositionModel
  ) {
    this.name = data.name
    this.characterClass = characterClass
    this.equipment = new EquipmentModel(this.characterClass.equipmentRequirements)
    this.spellBook = spellBook
    this.position = position
  }
  addItem(item: Inventory.Item) {
    this.inventory.addItem(item)
  }
  equipItem(id: number) {
    this.equipment.addItem(this.inventory.getItemById(id))
  }
  setHealth(hp: number, type: string) {
    if(type === SpellActionTypes.regain) {
      const maxHp = this.characterClass.getMaxHealth(this.level)
      return this.currentHealth+hp > maxHp
        ? maxHp
        : this.currentHealth += hp
    }
    this.currentHealth += hp
  }

  castSpell(id: number) {
    const spell = this.spellBook.getSpellById(20577)
    spell.action(this)
  }
}