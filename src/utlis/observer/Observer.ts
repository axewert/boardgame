import {Action} from "../../typings/observerActionTypes";

export class Observer {
  callback: (action: Action) => void
  constructor(callback: () => void) {
    this.callback = callback
  }
  update(action: Action) {
    this.callback(action)
  }
}
