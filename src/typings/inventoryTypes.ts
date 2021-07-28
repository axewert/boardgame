export namespace Inventory {
  export interface Item {
    id: number,
    slot: string,
    kind: string,
    buy: number[],
    sell: number[]
  }
}