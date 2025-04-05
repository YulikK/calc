import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { Component } from '@/shared/ui/component/component';

import style from './calculator.module.scss';

export class Calculator extends Component {
  constructor() {
    super({ tag: 'div', className: style.container });
    const display = new Display();
    const numbersPanel = new NumbersPanel();
    this.appendChildren([display, numbersPanel]);
  }
}
