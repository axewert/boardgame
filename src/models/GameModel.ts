import {Character} from "../typings/characterTypes";
import {CharacterModel} from "./CharacterModel";

export class GameModel {
  constructor() {}
  init() {
    this.fetchData('characters').then(res => {
      res.forEach(character => {
        console.log(new CharacterModel(character))
      })
    })
  }
  async fetchData(dataName: string) {
    const res = await fetch(`${process.env.HOST}/${dataName}.json`)
    return await res.json() as Character.Data[]
  }
}