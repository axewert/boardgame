import {Game} from "../../typings/typings";
import Classes = Game.Hero.Classes;

export const HEROES = [
  {
    name: 'Shailara Witherblade',
    heroClass: Classes.WARRIOR,
    health: 4,
    energy: 1,
    faction: 'alliance',
    inventory: {
      initialState: {
        range: 'range',
        melee: 'melee',
        accessory: 'accessory',
        armor: 'armor'
      },
      requirements: {
        range: ['bow', 'gun'],
        melee: ['mace', 'sword'],
        accessory: ['any'],
        armor: ['any']
      }
    }
  }
]