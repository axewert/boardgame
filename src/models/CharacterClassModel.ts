import {Character} from "../typings/characterTypes";

export class CharacterClassModel {
  name: string
  resourceName: string
  healthPerLevel: number
  resourcePerLevel: number
  equipmentRequirements: string[]
  constructor(data: Character.Class) {
    this.name = data.name
    this.resourceName = data.resourceName
    this.healthPerLevel = data.healthPerLevel
    this.resourcePerLevel = data.resourcePerLevel
    this.equipmentRequirements  = data.equipmentRequirements
  }
}