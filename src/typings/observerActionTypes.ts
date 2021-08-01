import {GameData} from "./gameDataTypes";
import {CharacterModel} from "../models/CharacterModel";

export interface Action {
  type: ActionTypes
  payload?: GameData | CharacterModel[]
}
export enum ActionTypes {
  ModelDataIsLoaded = 'ModelDataIsLoaded'
}
