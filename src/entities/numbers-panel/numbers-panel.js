import { OPERATIONS } from '@/shared/constant';
import { Button } from '@/shared/ui/button/button';
import { Component } from '@/shared/ui/component/component';

import styles from './numbers-panel.module.scss';

const NUMBERS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [OPERATIONS.comma, '0', OPERATIONS.equals],
];
export class NumbersPanel extends Component {
  constructor({ onNumberClick }) {
    super({ tag: 'div', className: styles.container });
    this.#renderView(onNumberClick);
  }

  #renderView(onNumberClick) {
    NUMBERS.forEach((row) => {
      row.forEach((item) => {
        const isOperation = typeof item === 'object';
        const button = new Button({
          text: isOperation ? '' : item,
          className: isOperation ? styles.operation : '',
          onClick: () => onNumberClick(isOperation ? item.value : item),
        });
        if (isOperation) {
          const img = new Component({
            tag: 'img',
            className: styles.img,
          });
          img.setAttribute('src', item.src);
          button.append(img);
        }
        this.append(button);
      });
    });
  }
}
