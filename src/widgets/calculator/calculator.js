import ClearPanel from '@/entities/clear-panel/clear-panel';
import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { OptionsPanel } from '@/entities/options-panel/options-panel';
import { OPERATORS, START_VALUE } from '@/shared/constant';
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
    const numbersPanel = new NumbersPanel({
      onNumberClick: this.onNumberClick,
      onOperationClick: this.onOperationClick,
    });
    const optionsPanel = new OptionsPanel({ onOperationClick: this.onOperationClick });
    panelsWrapper.appendChildren([numbersPanel, optionsPanel]);
    this.appendChildren([this.#display, clearPanel, panelsWrapper]);
  }

  onNumberClick = (number) => {
    this.#onExpressionUpdate(number);
  };

  onOperationClick = (operation) => {
    if (operation.value === OPERATORS.DELETE) {
      this.#onDeleteClick();
    } else if (operation.value === OPERATORS.CLEAR) {
      this.#onClearClick();
    } else if (operation.value === OPERATORS.EQUALS) {
      this.#onEqualsClick();
    } else if (operation.value === OPERATORS.COMMA) {
      this.#onCommaClick();
    } else {
      this.#onExpressionUpdate(operation.value);
    }
  };

  #onExpressionUpdate(value) {
    const lastItem = this.#expression[this.#expression.length - 1];
    const isValueOperator = Object.values(OPERATORS).includes(value);
    if (isValueOperator) {
      if (Object.values(OPERATORS).includes(lastItem)) {
        this.#expression[this.#expression.length - 1] = value;
      } else {
        this.#expression.push(value);
      }
    } else {
      if (!isNaN(Number(lastItem))) {
        this.#expression[this.#expression.length - 1] += value;
      } else {
        this.#expression.push(value);
      }
    }
    this.#onDisplayUpdate();
  }

  #onDeleteClick() {
    this.#expression = [];
    this.#onDisplayUpdate();
  }

  #onClearClick() {
    if (this.#expression.length > 0) {
      const lastItem = this.#expression[this.#expression.length - 1];
      if (lastItem.length > 1) {
        this.#expression[this.#expression.length - 1] = lastItem.slice(0, -1);
      } else {
        this.#expression.pop();
      }
    }
    this.#onDisplayUpdate();
  }

  #onEqualsClick() {
    const result = calculateExpression(this.#expression);
    const expression = this.#expression.join('');
    this.#expression = [String(result)];
    this.#onDisplayResult(result, expression);
  }

  #onCommaClick() {
    const lastItem = this.#expression[this.#expression.length - 1];
    if (!lastItem || Object.values(OPERATORS).includes(lastItem)) {
      this.#expression.push(`${START_VALUE}${OPERATORS.COMMA}`);
    } else if (!lastItem.includes(OPERATORS.COMMA)) {
      this.#expression[this.#expression.length - 1] += OPERATORS.COMMA;
    }
    this.#onDisplayUpdate();
  }

  #onDisplayUpdate() {
    this.#display.onDisplayChange(this.#expression.join(''));
  }

  #onDisplayResult(result, expression) {
    this.#display.onDisplayResult(result, expression);
  }
}
