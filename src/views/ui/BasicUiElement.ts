export class BasicUiElement {
  static createDomElement(html: string) {
    const wrapper = document.createElement('div')
    wrapper.insertAdjacentHTML('afterbegin', html.trim())
    return wrapper.firstChild as HTMLElement
  }
}