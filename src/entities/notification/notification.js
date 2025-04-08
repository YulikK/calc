import Component from '@/shared/ui/component/component';

import style from './notification.module.scss';

const NOTIFICATION_TIME = 1000;

export default class Notification extends Component {
  #text;
  constructor(text) {
    super({ tag: 'div', className: style.container });
    this.#text = text;
    this.#renderView();
    setTimeout(() => this.#hide(), NOTIFICATION_TIME);
  }

  #renderView() {
    const paragraph = new Component({ tag: 'p', className: style.text, text: this.#text });
    this.append(paragraph);
  }

  #hide() {
    this.toggleClass(style.hide);
    this.addListener('animationend', () => this.destroy());
  }
}
