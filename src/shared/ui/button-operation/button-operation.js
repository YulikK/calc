import Button from '@/shared/ui/button/button';
import Component from '@/shared/ui/component/component';

import styles from './button-operation.module.scss';
export default class ButtonOperation extends Button {
  #operation;

  constructor({ operation, className = '', onClick }) {
    const buttonClass = `${className} ${styles.operation}`.trim();
    super({ className: buttonClass, text: '', onClick });
    this.#operation = operation;
    this.#renderView();
  }

  #renderView() {
    const img = new Component({
      tag: 'img',
      className: styles.img,
    });
    img.setAttribute('src', this.#operation.src);
    this.append(img);
  }
}
