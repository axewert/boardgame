import {Character} from "../typings/characterTypes";

export class CharacterModel {
  private readonly name: string
  private readonly level: number = 1
  private readonly exp: number = 0
  private readonly health: number
  private readonly resource: number
  private readonly resourceName: string
  private readonly equipping: any[]
  private readonly inventory: any[]
  constructor(data: Character.Data) {
    this.name = data.name
    this.level = data.level || this.level
    this.exp = data.exp || this.exp
    this.health = data.health
    this.resource = data.resource
    this.resourceName = data.resourceName
  }
}