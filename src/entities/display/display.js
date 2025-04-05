import { Component } from '@/shared/ui/component/component';

import style from './display.module.scss';

export class Display extends Component {
  constructor() {
    super({ tag: 'div', className: style.container });
    this.result = new Component({ tag: 'p', className: style.result, text: '10' });
    this.display = new Component({ tag: 'p', className: style.display, text: '5+5' });
    this.appendChildren([this.result, this.display]);
  }
}
