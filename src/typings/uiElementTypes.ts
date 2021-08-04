import {SpellBook} from "./spellBookTypes";
import {CharacterModel} from "../models/CharacterModel";

export namespace UI {
  export interface Basic {
    listeners?: Listener[]
  }
  export interface Listener {
    name: string,
    handler: (e: Event) => void
  }
  export interface ButtonProps extends Basic{
    text: string
    modifiers?: string[]
    disabled?: boolean
    attributes?: {[key:string]: string}[]
  }
  export interface SpellCardProps extends Basic {
    spell: SpellBook.Spell<any>
  }
  export interface CharacterSelectorPanelProps extends Basic {
    characters: CharacterModel[],
    onClick: (e: MouseEvent) => void
  }
  export interface MenuProps extends Basic {
    buttons: ButtonProps[]
  }
  export interface StartScreenProps extends Basic {}

}