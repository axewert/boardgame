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
  private readonly _name: string
  private readonly level: number = 1
  private readonly exp: number = 0
  private currentHealth: number
  private currentResource: number
  private readonly equipment: EquipmentModel
  private readonly inventory = new InventoryModel()
  private readonly spellBook: SpellBookModel
  private readonly _race: string
  characterClass: CharacterClassModel
  private _position: CharacterPositionModel
  private readonly _gender: string;
  constructor(
    data: Character.Data,
    characterClass: CharacterClassModel,
    spellBook: SpellBookModel,
    position: CharacterPositionModel
  ) {
    this._name = data.name
    this._race = data.race
    this._gender = data.gender
    this.characterClass = characterClass
    this.equipment = new EquipmentModel(this.characterClass.equipmentRequirements)
    this.spellBook = spellBook
    this._position = position
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
  get name() {
    return this._name
  }
  get className() {
    return this.characterClass.name
  }
  get race() {
    return this._race
  }
  get gender() {
    return this._gender
  }
  get spells() {
    return this.spellBook.spells
  }
  get position() {
    return this._position
  }
}