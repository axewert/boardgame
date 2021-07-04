import {Tile} from "./Tile";
import {Game} from "./typings/typings";
import {TILES} from "./assets/js/tiles";

export class Location {
  name: string
  tiles: Game.Tile [][]

  constructor(tiles: string, name: string) {
    this.name = name
    this.tiles = this.parseTiles(tiles)
  }

  parseTiles = (map: string) => {
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
