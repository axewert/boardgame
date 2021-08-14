import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";
import {CharacterClassModel} from "./CharacterClassModel";

import {Inventory} from "../typings/inventoryTypes";
import {GameData, Player} from "../typings/gameDataTypes";

import {Subject} from "../utlis/observer/Subject";
import {Observer} from "../utlis/observer/Observer";
import {Action, ActionTypes} from "../typings/observerActionTypes";
import {SpellBook} from "../typings/spellBookTypes";
import {CharacterPositionModel} from "./CharacterPositionModel";
import {SpellBookModel} from "./SpellBookModel";


export class GameModel {
  private _items: Inventory.Item[]
  characters: CharacterModel[] = []
  private _races: Character.Race[]
  private _classes: Character.Class[]
  private readonly subject = new Subject()
  private spells: SpellBook.Spell<any>[]
  private activeCharacter: CharacterModel
  private players: Player<CharacterModel>[] = []
  charactersCacheName = 'characters-cache-v1'
  constructor() {}

  createNewGame() {
    this.fetchData('data')
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
        this.preloadCharacters().then(() => {
          this.notify({
              type: ActionTypes.CharactersIsLoaded,
              payload: this.charactersCacheName
            })
        })
      })
  }
  async preloadCharacters() {
    const manifests = await Promise.all(this.characters.map(character => {
      return this.getCharacterFiles(character)
    }))

  }
  get cache() {
    return caches.open(this.charactersCacheName)
  }
  async getCharacterFiles({race, className, gender}:CharacterModel) {
    const url = `assets/characters/${race}/${className}/${gender}`
    const getFilePath = (fileName: string) => {
      return `${process.env.HOST}/${url}/${fileName}`
    }
    const baseFiles = [
      "model.bin",
      "model.gltf",
      "model0.bin",
      "model1.bin",
      "model2.bin",
      "animations.json"
    ]
    return await fetch(`${url}/manifest.json`).then(res => res.json()).then(data => {
      return [
        ...data.files.map(getFilePath),
        ...baseFiles.map(getFilePath)
      ]
    })
  }
  play(players: Player<string>[]) {
    this.initPlayers(players)
    this.fetchData('world')
      .then(res => res.json())
      .then(world => {
        this.notify({
          type: ActionTypes.WorldIsReady
        })
      })
  }
  async fetchData(name:string) {
    return await fetch(`${process.env.DB}/${name}.json`)
  }
  initPlayers(players: Player<string>[]) {
    players.forEach(playerObj => {
      const {player, characters} = playerObj
      this.players.push(
        {
          player,
          characters: characters.map(charClass => this.getCharacterByClass(charClass))
        }
      )
    })
    this.activeCharacter = this.players[0].characters[0]
    this.cleanUp()
  }
  cleanUp() {
    const activeCharacters = this.players
      .reduce((acc, current) => {
        acc.push(...current.characters)
        return acc
      }, [])
    this.characters = this.characters
      .filter(character => activeCharacters.includes(character))
  }
  createNewCharacter(character: Character.Data) {
    const isExist = this.characters.find(char => char.name === character.name)
    if(isExist) return

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
  getCharactersBuyFaction(faction: string) {
    return this.characters.filter(character => character.faction === faction)
  }
}