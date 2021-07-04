import {Tile} from "./Tile";
import {Game} from "./typings/typings";
import {TILES} from "./assets/js/tiles";

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
        return row.trim().split(' ').map(tileName => {
          if (tileName === '.') return null
          return new Tile(TILES[tileName as keyof typeof TILES].name)
        })
      })
  }
}
