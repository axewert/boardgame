import {UI} from "../../typings/uiElementTypes";

export class BasicViewComponent<T extends UI.Basic> {
  protected domElement: HTMLElement
  protected name: string
  protected listeners: UI.Listener[]
  protected components: BasicViewComponent<any>[]
  protected init(props?: T) {
    this.createDomElement(this.html(props).trim())
  }

  protected createDomElement(html: string) {
    const wrapper = document.createElement('div')
    wrapper.insertAdjacentHTML('afterbegin', html.trim())
    this.domElement = wrapper.firstChild as HTMLElement
  }
  protected addComponents() {
    this.components.forEach(component => {
      this.domElement.append(component.getDomElement())
    })
  }
  protected createModifiers(mods: string[]) {
    return mods
      .map(mod => ` ${this.name}_${mod}`)
      .join(' ')
  }
  protected createDataAttributes(attrs: {[key:string]: string}[]) {
    return attrs
      .map(attr => {
        const key = Object.keys(attr)[0]
        return `data-${key} = ${attr[key]}`
      })
      .join(' ')
  }

  protected html(props?: T) {
    return ''
  }
  protected addListeners({listeners}: UI.ButtonProps) {
    this.listeners = listeners
    this.listeners.forEach(listener => {
      this.domElement.addEventListener(listener.name, listener.handler)
    })
  }

  destroy() {
    if (this.listeners) {
      this.listeners.forEach(listener => {
        this.domElement.removeEventListener(listener.name, listener.handler)
      })
    }
    if (this.components) this.components.forEach(component => component.destroy())
  }
  getDomElement() {
    return this.domElement
  }
}