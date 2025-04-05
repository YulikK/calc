import { Component } from '@/shared/ui/component/component';

import style from './button.module.scss';

export class Button extends Component {
  constructor({ className = '', text, onClick }) {
    const buttonClass = `${style.btn} ${className}`.trim();
    super({ tag: 'button', className: buttonClass, text });
    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', this.onClick);
    }
  }

  destroy() {
    this.removeListener('click', this.onClick);
    super.destroy();
  }
}
