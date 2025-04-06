import { OPERATIONS } from '@/shared/constant';
import { Button } from '@/shared/ui/button/button';
import { ButtonOperation } from '@/shared/ui/button-operation/button-operation';
import { Component } from '@/shared/ui/component/component';

import styles from './numbers-panel.module.scss';

const NUMBERS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [OPERATIONS.comma, '0', OPERATIONS.equals],
];
export class NumbersPanel extends Component {
  #onClick;

  constructor({ onNumberClick }) {
    super({ tag: 'div', className: styles.container });
    this.#onClick = onNumberClick;
    this.#renderView();
  }

  #renderView() {
    NUMBERS.forEach((row) => {
      row.forEach((item) => {
        const isOperation = typeof item === 'object';
        console.log('isOperation', isOperation, item);
        const button = isOperation
          ? new ButtonOperation({ operation: item, onClick: () => this.#onClick(item) })
          : new Button({ text: item, onClick: () => this.#onClick(item) });
        this.append(button);
      });
    });
  }
}
