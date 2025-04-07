import '@/app/favicon.png';
import '@/app/styles.scss';
import { Calculator } from '@/widgets/calculator/calculator';

const { body } = document;

const calculator = new Calculator();
body.append(calculator.getNode());
