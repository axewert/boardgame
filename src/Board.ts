import {LOCATIONS} from "./assets/js/locations";
import {Location} from "./Location";
import {Game} from "./typings/typings";
import {HEROES} from "./assets/js/heroes";
import {Hero} from "./Hero";

export class Board {
  locations: Game.Location.Instance[] = []
  heroes: Game.Hero.Instance[] = []
  constructor() {
    this.init()
  }
  init() {
    this.getMap().forEach(location => {
      this.locations.push(new Location(location))
    })
    this.getHeroes().forEach(heroData => {
      const hero = new Hero(heroData)
      hero.location = this.locations[0]
      hero.zone = 4
      this.heroes.push(hero)
    })
  }
  getHeroes() {
    return HEROES
  }
  getMap() {
    return LOCATIONS
  }
}


