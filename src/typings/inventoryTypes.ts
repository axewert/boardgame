export namespace Inventory {
  export interface Item {
    id: number,
    slot: string,
    kind: string,
    buy: number[],
    sell: number[]
  }
  export type ItemTypes =
    'feet' | 'head' | 'shoulder' | 'chest' |
    'back' | 'wrist' | 'hands' | 'waist' | 'legs' |
    'neck' | 'trinketFirst' | 'trinketSecond' |
    'finger' | 'mainHand' | 'offHand' | 'ranged'
}