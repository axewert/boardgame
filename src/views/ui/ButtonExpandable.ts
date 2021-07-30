export class ButtonExpandable {
  static html(text: string) {
    return `
      <div class="button">
        <div class="icon icon_class icon_${text}"></div>
        <div class="button__expandable-container">
          <div class="button__middle">
            <span class="button__text">${text.toUpperCase()}</span>
          </div>
          <div class="button__cap"></div>
        </div>
      </div>
    `
  }
}