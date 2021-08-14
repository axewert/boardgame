import {GameData} from "./gameDataTypes";
import {CharacterModel} from "../models/CharacterModel";

export interface Action {
  type: ActionTypes
  payload?: GameData | CharacterModel[] | ViewClassPanelInfo | string
}

export enum ActionTypes {
  ModelDataIsLoaded = 'ModelDataIsLoaded',
  ViewClassControlIsClicked = 'ViewClassControlIsClicked',
  WorldIsReady = 'WorldIsReady',
  NewGameButtonIsClicked = 'NewGameButtonIsClicked',
  NewCharacterButtonIsClicked = 'NewCharacterButtonIsClicked',
  CharacterIsCreated = 'CharacterIsCreated',
  NewGameIsAccepted = 'NewGameIsAccepted',
  CharactersIsLoaded = 'CharactersIsLoaded',
  NewActiveCharacterIsSelected = 'NewActiveCharacterIsSelected'
}

export type ViewClassPanelInfo = {className: string}
