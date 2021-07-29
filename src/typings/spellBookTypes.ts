export namespace SpellBook {
  export interface Spell {
    id: number,
    name: string,
    race: string,
    target: string,
    description: string,
    phase: string,
    type: string,
    action: string
  }
}