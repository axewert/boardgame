import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {Inventory} from "../typings/inventoryTypes";
import {GameData} from "../typings/gameDataTypes";
import {CharacterClassModel} from "./CharacterClassModel";
import {SpellBookModel} from "./SpellBookModel";
import {CharacterPositionModel} from "./CharacterPositionModel";
import {Subject} from "../utlis/observer/Subject";
import {Observer} from "../utlis/observer/Observer";


export class GameModel {
  private items: Inventory.Item[]
  private readonly characters: CharacterModel[] = []
  private readonly subject = new Subject()
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
  subscribe(observer: Observer) {
    this.subject.subscribe(observer)
  }
  unsubscribe(observer: Observer) {
    this.subject.unsubscribe(observer)
  }
  notify() {
    this.subject.notify()
  }
}