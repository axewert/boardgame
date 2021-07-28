export namespace Character {
  export interface Data {
    name: string
    health: number
    resource: number
    resourceName: string
    inventory: number[]
    level?: number
    exp?: number
  }
}