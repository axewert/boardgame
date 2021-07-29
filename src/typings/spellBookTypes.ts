import {CharacterModel} from "../models/CharacterModel";
import {Creature} from "./creatureTypes";

export namespace SpellBook {
  export interface Spell<T> {
    id: number,
    name: string,
    race: string,
    target: string,
    description: string,
    phase: string,
    type: string,
    action: T
  }
  export type SpellActionFn = (target: Creature) => void
}