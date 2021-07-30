import {Observer} from "./Observer";

export class Subject {
  observers: Observer[] = []
  subscribe(observer: Observer) {
    const isExist = this.observers.includes(observer)
    if (!isExist) this.observers.push(observer)
  }
  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
  notify() {
    this.observers.forEach(obs => obs.update())
  }
}