import {Game} from "./typings/typings";

export class Zone {
  private _creatures: Game.Creature[] = []
  private readonly _neighbours: number[] = []
  private readonly _name: string
  constructor({name, neighbours}: Game.Zone) {
    this._neighbours = neighbours
    this._name = name
  }
  get name() {
    return this._name
  }
  get neighbours() {
    return this._neighbours
  }
  get creatures() {
    return this._creatures
  }
}