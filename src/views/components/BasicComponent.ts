export class BasicComponent {
  _domElement: HTMLElement
  protected components: BasicComponent[] = []
  protected listeners: {name: string, handler: (e: Event) => void}[] = []
  private readonly _name: string
  constructor(
    html: string,
    name?: string
  ) {
    this.init(html)
    this._name = name || null
  }
  init(html: string) {
    this.createDomElement(html)
  }
  createDomElement(html: string) {
    const wrapper = document.createElement('div')
    wrapper.insertAdjacentHTML('afterbegin', html.trim())
    this._domElement =  wrapper.firstChild as HTMLElement
  }
  static createModifiers(name: string, mods: string[]) {
    return mods
      .map(mod => ` ${name}_${mod}`)
      .join(' ')
  }
  static createDataAttributes(attrs: {[key:string]: string}[]) {
    return attrs
      .map(attr => {
        const key = Object.keys(attr)[0]
        return `data-${key} = ${attr[key]}`
      })
      .join(' ')
  }
  add(...components: BasicComponent[]) {
    components.forEach(component => {
      this.components.push(component)
      this.domElement.append(component.domElement)
    })
    return this
  }
  addListeners(...listeners: {name: string, handler: (e: Event) => void}[]) {
    listeners.forEach(listener => {
      this.listeners.push(listener)
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
  get domElement() {
    return this._domElement
  }
  get name() {
    return this._name
  }
}