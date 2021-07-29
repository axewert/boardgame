import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {Inventory} from "../typings/inventoryTypes";
import {GameData} from "../typings/gameDataTypes";
import {SpellBook} from "../typings/spellBookTypes";

export class GameModel {
  private items: Inventory.Item[]
  private spells: SpellBook.Spell[]
  private readonly characters: CharacterModel[] = []
  constructor() {}
  init() {
    this.load().then(({items, characters, spells}: GameData) => {
      this.items = items
      this.spells = spells
      characters.forEach(charData => {
        const spells = this.spells
          .filter(spell => spell.race === charData.race)
        const character = new CharacterModel({...charData, spells})
        charData.inventory
          .forEach(id => character.addItem(this.getItemById(id)))
        this.characters.push(character)
      })
      this.start()
    })
  }
  start() {

  }
  async load() {
    return await this.fetchData<GameData>('data')
  }
  async fetchData<T>(dataName: string) {
    const res = await fetch(`${process.env.HOST}/${dataName}.json`)
    return await res.json() as T
  }
  getItemById(id: number) {
    return this.items.find(item => item.id === id)
  }
  getSpellByName(id: number) {
    return this.spells.find(item => item.id === id)
  }
}