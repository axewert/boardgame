import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {CharacterClassModel} from "./CharacterClassModel";

import {Inventory} from "../typings/inventoryTypes";
import {GameData} from "../typings/gameDataTypes";

import {Subject} from "../utlis/observer/Subject";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
import {SpellBook} from "../typings/spellBookTypes";
import {CharacterPositionModel} from "./CharacterPositionModel";
import {SpellBookModel} from "./SpellBookModel";


export class GameModel {
  private _items: Inventory.Item[]
  private readonly characters: CharacterModel[] = []
  private _races: Character.Race[]
  private _classes: Character.Class[]
  private readonly subject = new Subject()
  private spells: SpellBook.Spell<any>[]
  private readonly players = {
    human: '',
    computer: ''
  }

  constructor() {}
  init() {

  }
  createNewGame() {
    this.fetchData()
      .then(res => res.json())
      .then((data: GameData)=> {
        this._items = data.items
        this._races = data.races
        this._classes = data.classes
        this.spells = data.spells
        data.characters.forEach(character => this.createNewCharacter(character))
        this.notify({
          type: ActionTypes.ModelDataIsLoaded,
          payload: this.characters
        })
      })
  }
  async fetchData() {
    return await fetch(`${process.env.HOST}/data.json`)
  }

  createNewCharacter(character: Character.Data) {
    const position = this.races
      .find(race => race.name === character.race)
      .position
    const classData = this.classes
      .find(classObj => classObj.name === character.className)
    const spells = this.spells.filter(spell => classData.spells.includes(spell.id))
    this.characters.push(new CharacterModel(
      character,
      new CharacterClassModel(classData),
      new SpellBookModel(spells),
      new CharacterPositionModel(position)
    ))
  }

  start() {
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
  notify(action: Action) {
    this.subject.notify(action)
  }
  get items() {
    return this._items
  }
  get races() {
    return this._races
  }
  get classes() {
    return this._classes
  }
  getCharacterByClass(className: string) {
    return this.characters.find(character => character.className === className)
  }
}