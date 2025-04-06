import ClearPanel from '@/entities/clear-panel/clear-panel';
import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { OptionsPanel } from '@/entities/options-panel/options-panel';
import { OPERATORS } from '@/shared/constant';
import { Component } from '@/shared/ui/component/component';
import { calculateExpression } from '@/shared/util/calculate-expression';

import style from './calculator.module.scss';

export class Calculator extends Component {
  #display;
  #expression = [];

  constructor() {
    super({ tag: 'div', className: style.container });
    this.#renderView();
  }

  #renderView() {
    this.#display = new Display();
    const panelsWrapper = new Component({ tag: 'div', className: style.wrapper });
    const clearPanel = new ClearPanel({ onOperationClick: this.onOperationClick });
    const numbersPanel = new NumbersPanel({ onNumberClick: this.onNumberClick });
    const optionsPanel = new OptionsPanel({ onOperationClick: this.onOperationClick });
    panelsWrapper.appendChildren([numbersPanel, optionsPanel]);
    this.appendChildren([this.#display, clearPanel, panelsWrapper]);
  }

  onNumberClick = (number) => {
    const lastItem = this.#expression[this.#expression.length - 1];
    if (typeof lastItem === 'string' && !isNaN(Number(lastItem))) {
      this.#expression[this.#expression.length - 1] += number;
    } else {
      this.#expression.push(number);
    }
    this.#onDisplayUpdate();
    console.log(this.#expression);
  };

  onOperationClick = (operation) => {
    if (operation.value === OPERATORS.DELETE) {
      this.#expression = [];
      this.#onDisplayUpdate();
    } else if (operation.value === OPERATORS.CLEAR) {
      if (this.#expression.length > 0) {
        const lastItem = this.#expression[this.#expression.length - 1];
        if (lastItem.length > 1) {
          this.#expression[this.#expression.length - 1] = lastItem.slice(0, -1);
        } else {
          this.#expression.pop();
        }
      }
      this.#onDisplayUpdate();
    } else if (operation.value === OPERATORS.EQUALS) {
      const result = calculateExpression();
      this.#expression = [String(result)];
      this.#onDisplayUpdate(result);
    } else {
      const lastItem = this.#expression[this.#expression.length - 1];
      if (Object.values(OPERATORS).includes(lastItem)) {
        this.#expression[this.#expression.length - 1] = operation.value;
      } else {
        this.#expression.push(operation.value);
      }
      this.#onDisplayUpdate();
    }
    console.log(this.#expression);
  };

  #onDisplayUpdate(result) {
    this.#display.onDisplayChange(result ? result : this.#expression.join(''));
  }
}
