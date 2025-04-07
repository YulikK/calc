import ClearPanel from '@/entities/clear-panel/clear-panel';
import Display from '@/entities/display/display';
import NumbersPanel from '@/entities/numbers-panel/numbers-panel';
import OptionsPanel from '@/entities/options-panel/options-panel';
import { BUTTON_TYPE, COPY_MSG, ERROR, KEY_MAPPINGS, OPERATORS, STATES } from '@/shared/constant';
import Component from '@/shared/ui/component/component';
import Notification from '@/shared/ui/notification/notification';
import { calculateExpression } from '@/shared/util/calculate-expression';
import {
  clearLastValue,
  getCalcState,
  updateExpressionArray,
  updateExpressionWithComma,
} from '@/shared/util/helpers';

import style from './calculator.module.scss';

//TODO: add theme switcher

export default class Calculator extends Component {
  #display;
  #expression = [];
  #state = STATES.READY;
  #operationHandlers = {
    [OPERATORS.DELETE]: () => this.#deleteClick(),
    [OPERATORS.CLEAR]: () => this.#clearClick(),
    [OPERATORS.EQUALS]: () => this.#equalsClick(),
    [OPERATORS.COMMA]: () => this.#commaClick(),
    [OPERATORS.COPY]: () => this.#copyClick(),
  };

  constructor() {
    super({ tag: 'div', className: style.container });
    this.#renderView();
    this.#initKeyboardSupport();
  }

  #initKeyboardSupport() {
    document.addEventListener('keydown', this.#onKeyPress);
  }

  #onKeyPress = (event) => {
    event.preventDefault();

    const key = event.key;
    const mappedValue = KEY_MAPPINGS[key];

    if (!mappedValue) return;

    if (!isNaN(mappedValue)) {
      this.onNumberClick(mappedValue);
    } else {
      this.onOperationClick({ value: mappedValue });
    }
  };

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
    const handler = this.#operationHandlers[operation.value];
    if (handler) {
      handler();
    } else {
      this.#updateExpression(operation.value);
    }
  };

  #updateExpression(value) {
    this.#expression = updateExpressionArray(this.#expression, value);
    this.#displayUpdate();
  }

  #deleteClick() {
    this.#expression = [];
    this.#displayUpdate();
  }

  #clearClick() {
    this.#expression = clearLastValue(this.#expression);
    this.#displayUpdate();
  }

  #equalsClick() {
    const expression = this.#expression.join('');
    try {
      const result = calculateExpression(this.#expression);
      this.#state = STATES.RESULT;
      this.#expression = [String(result)];
      this.#displayResult(result, expression);
    } catch (error) {
      this.#state = STATES.ERROR;
      this.#expression = [error];
      this.#displayResult(ERROR, expression);
    }
  }

  #copyClick() {
    const value = this.#expression.join('');
    navigator.clipboard.writeText(value).then(() => {
      const notification = new Notification(COPY_MSG);
      this.append(notification);
    });
  }

  #commaClick() {
    this.#expression = updateExpressionWithComma(this.#expression);
    this.#displayUpdate();
  }

  #displayUpdate() {
    this.#display.onDisplayChange(this.#expression.join(''));
  }

  #displayResult(result, expression) {
    this.#display.onDisplayResult(result, expression);
  }

  #displayRefresh(buttonType) {
    const newState = getCalcState(this.#state, buttonType);
    this.#state = newState.stage;
    if (newState.expression !== null) {
      this.#expression = newState.expression;
    }
  }
}
