import ClearPanel from '@/entities/clear-panel/clear-panel';
import { Display } from '@/entities/display/display';
import { NumbersPanel } from '@/entities/numbers-panel/numbers-panel';
import { OptionsPanel } from '@/entities/options-panel/options-panel';
import { ERROR, OPERATORS, START_VALUE } from '@/shared/constant';
import { Component } from '@/shared/ui/component/component';
import { calculateExpression } from '@/shared/util/calculate-expression';
import { isOperator } from '@/shared/util/helpers';

import style from './calculator.module.scss';

// TODO: if NAN or ERROR - refresh display
// TODO: add favicon
//TODO: add keyboard support
//TODO: add copy result
//TODO: add theme switcher

const BUTTON_TYPE = {
  NUMBER: 'number',
  OPERATION: 'operation',
};

const STAGES = {
  READY: 'ready',
  RESULT: 'result',
  ERROR: 'error',
};
export class Calculator extends Component {
  #display;
  #expression = [];
  #stage = STAGES.READY;

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
    this.#displayRefresh(BUTTON_TYPE.NUMBER);
    this.#updateExpression(number);
  };

  onOperationClick = (operation) => {
    this.#displayRefresh(
      operation.value === OPERATORS.COMMA ? BUTTON_TYPE.NUMBER : BUTTON_TYPE.OPERATION
    );
    if (operation.value === OPERATORS.DELETE) {
      this.#deleteClick();
    } else if (operation.value === OPERATORS.CLEAR) {
      this.#clearClick();
    } else if (operation.value === OPERATORS.EQUALS) {
      this.#equalsClick();
    } else if (operation.value === OPERATORS.COMMA) {
      this.#commaClick();
    } else {
      this.#updateExpression(operation.value);
    }
  };

  #updateExpression(value) {
    const lastItem = this.#expression[this.#expression.length - 1];
    const previousItem = this.#expression[this.#expression.length - 2];
    const isLastItemOperator = isOperator(lastItem);
    const isPreviousItemOperator = isOperator(previousItem);
    if (isOperator(value)) {
      if (!isLastItemOperator) {
        this.#expression.push(value);
      } else if (isPreviousItemOperator && isLastItemOperator && value === OPERATORS.MINUS) {
        this.#expression[this.#expression.length - 1] = value;
      } else if (isPreviousItemOperator && isLastItemOperator && value !== OPERATORS.MINUS) {
        this.#expression.pop();
        this.#expression[this.#expression.length - 1] = value;
      } else if (
        isLastItemOperator &&
        (lastItem === OPERATORS.MINUS || lastItem === OPERATORS.PLUS)
      ) {
        this.#expression[this.#expression.length - 1] = value;
      } else if (
        isLastItemOperator &&
        value === OPERATORS.MINUS &&
        (lastItem === OPERATORS.DIVIDE || lastItem === OPERATORS.MULTIPLY)
      ) {
        this.#expression.push(value);
      } else {
        this.#expression[this.#expression.length - 1] = value;
      }
    } else {
      if (
        !isNaN(Number(lastItem)) ||
        (lastItem === OPERATORS.MINUS && isPreviousItemOperator) ||
        this.#expression.length === 1
      ) {
        this.#expression[this.#expression.length - 1] += value;
      } else {
        this.#expression.push(value);
      }
    }
    this.#displayUpdate();
  }

  #deleteClick() {
    this.#expression = [];
    this.#displayUpdate();
  }

  #clearClick() {
    if (this.#expression.length > 0) {
      const lastItem = this.#expression[this.#expression.length - 1];
      if (lastItem.length > 1) {
        this.#expression[this.#expression.length - 1] = lastItem.slice(0, -1);
      } else {
        this.#expression.pop();
      }
    }
    this.#displayUpdate();
  }

  #equalsClick() {
    const expression = this.#expression.join('');
    try {
      const result = calculateExpression(this.#expression);
      this.#stage = STAGES.RESULT;
      this.#expression = [String(result)];
      this.#displayResult(result, expression);
    } catch (error) {
      this.#stage = STAGES.ERROR;
      this.#expression = [error];
      this.#displayResult(ERROR, expression);
    }
  }

  #commaClick() {
    const lastItem = this.#expression[this.#expression.length - 1];
    const previousItem = this.#expression[this.#expression.length - 2];
    if (!lastItem) {
      this.#expression.push(`${START_VALUE}${OPERATORS.COMMA}`);
    } else if (lastItem === OPERATORS.MINUS && isOperator(previousItem)) {
      this.#expression[this.#expression.length - 1] += `${START_VALUE}${OPERATORS.COMMA}`;
    } else if (lastItem === OPERATORS.MINUS) {
      this.#expression.push(`${START_VALUE}${OPERATORS.COMMA}`);
    } else if (isOperator(lastItem)) {
      this.#expression.push(`${START_VALUE}${OPERATORS.COMMA}`);
    } else if (!lastItem.includes(OPERATORS.COMMA)) {
      this.#expression[this.#expression.length - 1] += OPERATORS.COMMA;
    }
    this.#displayUpdate();
  }

  #displayUpdate() {
    this.#display.onDisplayChange(this.#expression.join(''));
  }

  #displayResult(result, expression) {
    this.#display.onDisplayResult(result, expression);
  }

  #displayRefresh(buttonType) {
    if (buttonType === BUTTON_TYPE.OPERATION && this.#stage === STAGES.RESULT) {
      this.#stage = STAGES.READY;
    } else if (buttonType === BUTTON_TYPE.NUMBER && this.#stage === STAGES.RESULT) {
      this.#expression = [];
      this.#stage = STAGES.READY;
    } else if (this.#stage === STAGES.ERROR) {
      this.#expression = [START_VALUE];
      this.#stage = STAGES.READY;
    }
  }
}
