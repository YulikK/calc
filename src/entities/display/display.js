import { Component } from '@/shared/ui/component/component';

import style from './display.module.scss';

export class Display extends Component {
  constructor() {
    super({ tag: 'div', className: style.container });
    this.#renderView();
  }

  #renderView() {
    this.result = new Component({ tag: 'p', className: style.result, text: '' });
    this.display = new Component({ tag: 'p', className: style.display, text: '' });
    this.appendChildren([this.result, this.display]);
  }

  onDisplayChange(value) {
    console.log('onDisplayChange', value);
    this.display.setTextContent(value);
    const element = this.display.getNode();
    element.scrollLeft = element.scrollWidth;
  }
}
