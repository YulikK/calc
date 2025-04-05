import { Button } from '@/shared/ui/button/button';
import { Component } from '@/shared/ui/component/component';

import style from './calculator.module.scss';

export class Calculator extends Component {
  constructor() {
    super({ tag: 'div', className: style.container });
    const btn = new Button({ className: '', text: '1', onClick: () => {} });
    this.append(btn);
  }
}
