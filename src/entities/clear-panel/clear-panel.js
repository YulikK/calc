import { OPERATIONS } from '@/shared/constant';
import { ButtonOperation } from '@/shared/ui/button-operation/button-operation';
import { Component } from '@/shared/ui/component/component';

import style from './clear-panel.module.scss';

const options = [OPERATIONS.clear, OPERATIONS.delete];

export default class ClearPanel extends Component {
  #onClick;

  constructor({ onOperationClick }) {
    super({ tag: 'div', className: style.container });
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
