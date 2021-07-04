import {Game} from "./typings/typings";

export class Tile {
  creatures: Game.Creature[] = []
  constructor(public name: string) {}
}