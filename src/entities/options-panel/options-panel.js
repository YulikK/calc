import { OPERATIONS } from '@/shared/constant';
import { Button } from '@/shared/ui/button/button';
import { Component } from '@/shared/ui/component/component';

import styles from './options-panel.module.scss';

const options = [OPERATIONS.plus, OPERATIONS.minus, OPERATIONS.multiply, OPERATIONS.divide];

export class OptionsPanel extends Component {
  constructor() {
    super({ tag: 'div', className: styles.container });
    this.#renderView();
  }

  #renderView() {
    options.forEach((item) => {
      const button = new Button({
        className: `${styles.operation} ${item.value === 'RESULT' ? styles.result : ''}`,
        text: '',
        onClick: this.onOperationClick,
      });
      const img = new Component({
        tag: 'img',
        className: styles.img,
      });
      img.setAttribute('src', item.src);
      button.appendChildren([img]);
      this.append(button);
    });
  }

  onOperationClick = () => {};
}
