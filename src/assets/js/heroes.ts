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
      items: [
      {   name: 'BOW',
          kind: 'range',
          type: 'bow',
          level: 10,
          cost: 10,
          energy: 10,
          description: 'string'
      }
      ],
      requirements: {
        range: ['bow', 'gun'],
        melee: ['mace', 'sword'],
        accessory: ['any'],
        armor: ['any']
      }
    }
  }
]