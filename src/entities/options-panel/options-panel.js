import NumbersPanel from '@/entities/numbers-panel/numbers-panel';
import ThemeSwitcher from '@/features/theme-switcher/theme-switcher';
import { OPTION_BUTTONS, START_VALUE } from '@/shared/constant';
import Button from '@/shared/ui/button/button';
import ButtonOperation from '@/shared/ui/button-operation/button-operation';
import Component from '@/shared/ui/component/component';

import styles from './options-panel.module.scss';

const options = [
  {
    operation: OPTION_BUTTONS.clear,
    className: styles.opTopRow,
  },
  {
    operation: OPTION_BUTTONS.sign,
    className: styles.opTopRow,
  },
  {
    operation: OPTION_BUTTONS.percent,
    className: styles.opTopRow,
  },
  {
    operation: OPTION_BUTTONS.divide,
    className: styles.opRightColumn,
  },
  {
    operation: OPTION_BUTTONS.multiply,
    className: styles.opRightColumn,
  },
  {
    operation: OPTION_BUTTONS.minus,
    className: styles.opRightColumn,
  },
  {
    operation: OPTION_BUTTONS.plus,
    className: styles.opRightColumn,
  },
  {
    operation: OPTION_BUTTONS.equals,
    className: styles.opRightColumn,
  },
  {
    operation: OPTION_BUTTONS.comma,
    className: styles.opComma,
  },
];

export default class OptionsPanel extends Component {
  #onNumberClick;
  #onOperationClick;

  constructor({ onNumberClick, onOperationClick }) {
    super({ tag: 'div', className: styles.container });
    this.#onOperationClick = onOperationClick;
    this.#onNumberClick = onNumberClick;
    this.#renderView();
  }

  #renderView() {
    options.forEach((item) => {
      const button = new ButtonOperation({
        operation: item.operation,
        className: item.className,
        onClick: () => this.#onOperationClick(item.operation),
      });
      this.append(button);
    });
    const themeButton = new ThemeSwitcher({ className: styles.opTheme });
    this.append(themeButton);
    const numbersPanel = new NumbersPanel({
      className: styles.numbers,
      onNumberClick: this.#onNumberClick,
    });
    this.append(numbersPanel);
    const button = new Button({
      text: START_VALUE,
      onClick: () => this.#onNumberClick(START_VALUE),
      className: styles.zero,
    });
    button.setAttribute('aria-label', `Number ${START_VALUE}`);
    button.setAttribute('title', `Press ${START_VALUE}`);
    this.append(button);
  }
}
