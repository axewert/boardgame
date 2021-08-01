import {Observer} from "./Observer";
import {Action} from "../../typings/observerActionTypes";

export class Subject {
  observers: Observer[] = []
  subscribe(observer: Observer) {
    const isExist = this.observers.includes(observer)
    if (!isExist) this.observers.push(observer)
  }
  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
  notify(action: Action) {
    this.observers.forEach(obs => obs.update(action))
  }
}