import { Component } from '@/shared/ui/component/component';

import style from './display.module.scss';

export class Display extends Component {
  constructor() {
    super({ tag: 'div', className: style.container });
    this.#renderView();
  }

  #renderView() {
    this.expression = new Component({ tag: 'p', className: style.result, text: '' });
    this.display = new Component({ tag: 'p', className: style.display, text: '' });
    this.appendChildren([this.expression, this.display]);
  }

  onDisplayChange(value) {
    this.display.setTextContent(value);
    this.expression.setTextContent('');
  }

  onDisplayResult(value, expression) {
    this.expression.setTextContent(expression);
    this.display.setTextContent(value);
  }
}
