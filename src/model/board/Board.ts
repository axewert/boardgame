import {Location} from "../location/Location";
import {Game} from "../../typings/typings";


export class Board {
  locations: Game.Location.Instance[] = []
  constructor(locations: Game.Location.Data[]) {
    this.locations = locations.map(loc => new Location(loc))
  }
}


