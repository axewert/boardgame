import {LOCATIONS} from "./assets/js/locations";
import {Location} from "./Location";

export class Board {
  locations: Location[] = []
  constructor() {
    this.init()
  }
  init() {
    this.getMap().forEach(location => {
      const {tiles, name} = location
      this.locations.push(new Location(tiles, name))
    })
    console.log(this.locations)
  }
  getMap() {
    return LOCATIONS
  }
}


