import {Zone} from "./Zone";
import {Game} from "./typings/typings";
import {TILES} from "./assets/js/tiles";

export class Location implements Game.Location.Instance{
  name: string
  zones: Game.Zone [] = []
  constructor({name, zones}: Game.Location.Data) {
    this.name = name
    this.zones = zones.map(zone => new Zone(zone))
  }
  getNearestZones(currentZone: number, radius = 1) {
    return this.zones[currentZone].neighbours
  }
}
