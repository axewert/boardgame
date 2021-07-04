export class Location {
  name: string
  map: string [][]

  constructor(map: string, name: string) {
    this.name = name
    this.map = this.parseMap(map)
  }

  parseMap = (map: string) => {
    return map
      .trim()
      .split('\n')
      .map(row => {
        return row.trim().split(' ')
      })
  }
}
