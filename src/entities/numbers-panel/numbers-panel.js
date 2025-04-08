import Button from '@/shared/ui/button/button';
import Component from '@/shared/ui/component/component';

import styles from './numbers-panel.module.scss';

const NUMBERS = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];
export default class NumbersPanel extends Component {
  #onNumberClick;

  constructor({ className, onNumberClick }) {
    super({ tag: 'div', className: `${className} ${styles.container}` });
    this.#onNumberClick = onNumberClick;
    this.#renderView();
  }

  #renderView() {
    NUMBERS.forEach((item) => {
      const button = new Button({ text: item, onClick: () => this.#onNumberClick(item) });
      button.setAttribute('aria-label', `Number ${item}`);
      button.setAttribute('title', `Press ${item}`);
      this.append(button);
    });
  }
}
