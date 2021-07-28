import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {Inventory} from "../typings/inventoryTypes";

export class GameModel {
  private items: Inventory.Item[]
  private readonly characters: CharacterModel[] = []
  constructor() {}
  init() {
    this.load().then(() => console.log('start'))
  }
  async load() {
    await this.fetchData<Inventory.Item[]>('items').then(res=> {
      this.items = res
    })
    await this.fetchData<Character.Data[]>('characters').then(res => {
      res.forEach(characterData => {
        const character =  new CharacterModel(characterData)
        characterData.inventory.forEach(id => character.addItem(this.getItemById(id)))
        this.characters.push(character)
      })
    })
  }
  async fetchData<T>(dataName: string) {
    const res = await fetch(`${process.env.HOST}/${dataName}.json`)
    return await res.json() as T
  }
  getItemById(id: number) {
    return this.items.filter(item => item.id === id).pop()
  }
}