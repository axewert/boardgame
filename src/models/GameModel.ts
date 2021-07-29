import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {Inventory} from "../typings/inventoryTypes";
import {GameData} from "../typings/gameDataTypes";
import {CharacterClassModel} from "./CharacterClassModel";
import {SpellBookModel} from "./SpellBookModel";
import {CharacterPositionModel} from "./CharacterPositionModel";

export class GameModel {
  private items: Inventory.Item[]
  private readonly characters: CharacterModel[] = []
  private readonly players = {
    human: '',
    computer: ''
  }
  constructor() {}
  init() {
    this.load().then((data: GameData) => {
      this.items = data.items
      this.createCharacters(data)
      this.start()
    })
  }
  createCharacters({characters, classes, spells}: GameData) {
    characters.forEach(charData => {
      const characterClassData = classes.find(cls => cls.name === charData.characterClass)
      const charSpells = spells
        .filter(spell => spell.race === charData.race)
      const character = new CharacterModel(
        charData,
        new CharacterClassModel(characterClassData),
        new SpellBookModel(charSpells),
        new CharacterPositionModel(charData.position)
      )
      charData.inventory
        .forEach(id => character.addItem(this.getItemById(id)))
      this.characters.push(character)
    })
  }
  start() {
    console.log(this.characters[0])
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
}