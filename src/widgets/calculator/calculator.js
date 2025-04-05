import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { Component } from '@/shared/ui/component/component';

import style from './calculator.module.scss';

export class Calculator extends Component {
  #display;

  constructor() {
    super({ tag: 'div', className: style.container });
    this.#display = new Display();
    const numbersPanel = new NumbersPanel({ onNumberClick: this.onNumberClick });
    this.appendChildren([this.#display, numbersPanel]);
  }

  onNumberClick = (number) => {
    console.log(number);
    this.#display.onDisplayChange(number);
  };
}
