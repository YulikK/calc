import { OPERATIONS } from '@/shared/constant';
import { ButtonOperation } from '@/shared/ui/button-operation/button-operation';
import { Component } from '@/shared/ui/component/component';

import styles from './options-panel.module.scss';

const options = [OPERATIONS.divide, OPERATIONS.multiply, OPERATIONS.minus, OPERATIONS.plus];

export class OptionsPanel extends Component {
  #onClick;

  constructor({ onOperationClick }) {
    super({ tag: 'div', className: styles.container });
    this.#onClick = onOperationClick;
    this.#renderView();
  }

  #renderView() {
    options.forEach((item) => {
      const button = new ButtonOperation({
        operation: item,
        onClick: () => this.#onClick(item),
      });
      this.append(button);
    });
  }
}
