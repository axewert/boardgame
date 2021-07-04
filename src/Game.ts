import {LOCATIONS} from "./assets/js/locations";
import {Location} from "./Location";

export class Game {
  locations: Location[] = []
  constructor() {
    this.init()
  }
  init() {
    this.getMap().forEach(location => {
      const {map, name} = location
      this.locations.push(new Location(map, name))
    })
    console.log(this.locations)
  }
  getMap() {
    return LOCATIONS
  }


}


