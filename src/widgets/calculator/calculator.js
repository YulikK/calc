import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { OptionsPanel } from '@/entities/options-panel/options-panel';
import { Component } from '@/shared/ui/component/component';

import style from './calculator.module.scss';

export class Calculator extends Component {
  #display;

  constructor() {
    super({ tag: 'div', className: style.container });
    this.#display = new Display();
    const panelsWrapper = new Component({ tag: 'div', className: style.wrapper });
    const numbersPanel = new NumbersPanel({ onNumberClick: this.onNumberClick });
    const optionsPanel = new OptionsPanel();
    panelsWrapper.appendChildren([numbersPanel, optionsPanel]);
    this.appendChildren([this.#display, panelsWrapper]);
  }

  onNumberClick = (number) => {
    console.log(number);
    this.#display.onDisplayChange(number);
  };
}
