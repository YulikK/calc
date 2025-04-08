import ThemeSwitcher from '@/features/theme-switcher/theme-switcher';
import { OPTION_BUTTONS } from '@/shared/constant';
import ButtonOperation from '@/shared/ui/button-operation/button-operation';
import Component from '@/shared/ui/component/component';

import style from './control-panel.module.scss';

const options = [OPTION_BUTTONS.copy, OPTION_BUTTONS.clear, OPTION_BUTTONS.delete];

export default class ControlPanel extends Component {
  #onClick;

  constructor({ onOperationClick }) {
    super({ tag: 'div', className: style.container });
    this.#onClick = onOperationClick;
    this.#renderView();
  }
  #renderView() {
    const themeButton = new ThemeSwitcher();
    this.append(themeButton);
    options.forEach((item) => {
      const button = new ButtonOperation({
        operation: item,
        onClick: () => this.#onClick(item),
      });
      this.append(button);
    });
  }
}
