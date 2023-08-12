export class Section {
  constructor({renderer }, selector) {
    this._renderer = renderer;
    this._container = selector;
  }

  renderItems(items, id) {
   items.forEach((item) => {
      this._renderer(item, id);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
