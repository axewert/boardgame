import {Tile} from "./Tile";
import {Game} from "./typings/typings";

export class Location {
  name: string
  tiles: Game.Tile [][]

  constructor(map: string, name: string) {
    this.name = name
    this.tiles = this.parseMap(map)
  }

  parseMap = (map: string) => {
    return map
      .trim()
      .split('\n')
      .map(row => {
        return row.trim().split(' ').map(tile => new Tile())
      })
  }
}
