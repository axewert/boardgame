import {Character} from "../typings/characterTypes";

export class CharacterPositionModel {
  private readonly world: string
  private readonly continent: string
  private readonly location: string
  private readonly region: string
  private readonly x: number
  private readonly y: number
  private readonly z: number
  tile: number[] = [32,48]
  constructor(position: Character.Position) {
    this.world = position.world
    this.continent = position.continent
    this.location = position.location
    this.region = position.region
    this.x = position.x
    this.y = position.y
    this.z = position.z
  }
}