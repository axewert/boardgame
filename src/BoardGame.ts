import {Board} from "./Board";
import {Game} from "./typings/typings";
import {LOCATIONS} from "./assets/js/locations";
import {HEROES} from "./assets/js/heroes";
import {Hero} from "./Hero";

export class BoardGame {
  board: Board
  heroes: Game.Hero.Instance[] = []
  constructor() {
    this.init()
  }
  private init() {
    this.board = new Board(this.getMap())
    this.getHeroes().forEach(hero => {
      this.heroes.push(new Hero(hero))
    })
    console.log(this.heroes[0])
  }
  private getHeroes() {
    return HEROES
  }
  private getMap() {
    return LOCATIONS
  }
}