import Component from '@/shared/ui/component/component';

import style from './notification.module.scss';

const NOTIFICATION_TIME = 5000;

export default class Notification extends Component {
  #text;
  constructor(text) {
    super({ tag: 'div', className: style.container });
    this.#text = text;
    this.#renderView();
    setTimeout(() => this.destroy(), NOTIFICATION_TIME);
  }

  #renderView() {
    const paragraph = new Component({ tag: 'p', className: style.text, text: this.#text });
    this.append(paragraph);
  }
}
