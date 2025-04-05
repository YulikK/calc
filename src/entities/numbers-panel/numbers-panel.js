import { Button } from '@/shared/ui/button/button';
import { Component } from '@/shared/ui/component/component';

import styles from './numbers-panel.module.scss';

const NUMBERS = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['0']];
export class NumbersPanel extends Component {
  constructor() {
    super({ tag: 'div', className: styles.container });
    NUMBERS.forEach((row) => {
      row.forEach((number) => {
        const button = new Button({
          text: number,
          onClick: () => this.numberClick(number),
        });
        this.append(button);
      });
    });
  }

  numberClick(number) {
    console.log(number);
  }
}
