import { OPERATIONS } from '@/shared/constant';
import Button from '@/shared/ui/button/button';
import ButtonOperation from '@/shared/ui/button-operation/button-operation';
import Component from '@/shared/ui/component/component';

import styles from './numbers-panel.module.scss';

const NUMBERS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [OPERATIONS.comma, '0', OPERATIONS.equals],
];
export default class NumbersPanel extends Component {
  #onNumberClick;
  #onOperationClick;

  constructor({ onNumberClick, onOperationClick }) {
    super({ tag: 'div', className: styles.container });
    this.#onNumberClick = onNumberClick;
    this.#onOperationClick = onOperationClick;
    this.#renderView();
  }

  #renderView() {
    NUMBERS.forEach((row) => {
      row.forEach((item) => {
        const isOperation = typeof item === 'object';
        const button = isOperation
          ? new ButtonOperation({ operation: item, onClick: () => this.#onOperationClick(item) })
          : new Button({ text: item, onClick: () => this.#onNumberClick(item) });
        this.append(button);
      });
    });
  }
}
