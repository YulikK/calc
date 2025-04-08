import ControlPanel from '@/entities/control-panel/control-panel';
import Display from '@/entities/display/display';
import Notification from '@/entities/notification/notification';
import OptionsPanel from '@/entities/options-panel/options-panel';
import { BUTTON_TYPE, COPY_MSG, ERROR, KEY_MAPPINGS, OPTIONS, STATES } from '@/shared/constant';
import Component from '@/shared/ui/component/component';
import { calculateExpression } from '@/shared/util/calculate-expression';
import {
  clearLastValue,
  getCalcState,
  updateExpressionArray,
  updateExpressionWithComma,
  updateExpressionWithNumber,
  updateExpressionWithPercent,
  updateExpressionWithSign,
} from '@/shared/util/helpers';

import style from './calculator.module.scss';

export default class Calculator extends Component {
  #display;
  #expression = [];
  #state = STATES.READY;
  #operationHandlers = {
    [OPTIONS.DELETE]: () => this.#deleteClick(),
    [OPTIONS.CLEAR]: () => this.#clearClick(),
    [OPTIONS.EQUALS]: () => this.#equalsClick(),
    [OPTIONS.COMMA]: () => this.#commaClick(),
    [OPTIONS.COPY]: () => this.#copyClick(),
    [OPTIONS.SIGN]: () => this.#signClick(),
    [OPTIONS.PERCENT]: () => this.#percentClick(),
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
    } else if (mappedValue === OPTIONS.COPY && (event.ctrlKey || event.metaKey)) {
      this.#copyClick();
    } else {
      this.onOperationClick({ value: mappedValue });
    }
  };

  #renderView() {
    this.#display = new Display();
    const panelsWrapper = new Component({ tag: 'div', className: style.wrapper });
    const controlPanel = new ControlPanel({ onOperationClick: this.onOperationClick });

    const optionsPanel = new OptionsPanel({
      onNumberClick: this.onNumberClick,
      onOperationClick: this.onOperationClick,
    });
    panelsWrapper.appendChildren([optionsPanel]);
    this.appendChildren([controlPanel, this.#display, panelsWrapper]);
  }

  onNumberClick = (number) => {
    this.#displayRefresh(BUTTON_TYPE.NUMBER);
    this.#expression = updateExpressionWithNumber(this.#expression, number);
    console.log(this.#expression);
    this.#displayUpdate();
  };

  onOperationClick = (operation) => {
    this.#displayRefresh(
      operation.value === OPTIONS.COMMA ? BUTTON_TYPE.NUMBER : BUTTON_TYPE.OPERATION
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
    console.log(this.#expression);
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

  #signClick() {
    this.#expression = updateExpressionWithSign(this.#expression);
    this.#displayUpdate();
  }

  #percentClick() {
    this.#expression = updateExpressionWithPercent(this.#expression);
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
