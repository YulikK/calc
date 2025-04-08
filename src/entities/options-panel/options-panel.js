import { OPTION_BUTTONS } from '@/shared/constant';
import ButtonOperation from '@/shared/ui/button-operation/button-operation';
import Component from '@/shared/ui/component/component';

import styles from './options-panel.module.scss';

const options = [
  OPTION_BUTTONS.divide,
  OPTION_BUTTONS.multiply,
  OPTION_BUTTONS.minus,
  OPTION_BUTTONS.plus,
];

export default class OptionsPanel extends Component {
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
