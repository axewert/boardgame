export class Observer {
  callback: () => void
  constructor(callback: () => void) {
    this.callback = callback
  }
  update() {
    this.callback()
  }
}
