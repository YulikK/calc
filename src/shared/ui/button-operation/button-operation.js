import Button from '@/shared/ui/button/button';
import Component from '@/shared/ui/component/component';

import styles from './button-operation.module.scss';
export default class ButtonOperation extends Button {
  #operation;
  #img;
  constructor({ operation, className = '', onClick }) {
    const buttonClass = `${className} ${styles.operation}`.trim();
    super({ className: buttonClass, text: '', onClick });
    this.#operation = operation;
    this.#renderView();
  }

  #renderView() {
    this.setAttribute('title', this.#operation.title);
    this.setAttribute('aria-label', this.#operation.ariaLabel);
    this.#img = new Component({
      tag: 'img',
      className: styles.img,
    });
    this.#img.setAttribute('src', this.#operation.src);
    this.#img.setAttribute('alt', this.#operation.alt);
    this.append(this.#img);
  }
  setImage(src) {
    this.#img.setAttribute('src', src);
  }
}
