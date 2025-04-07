import { ERROR } from '@/shared/constant';

export function calculateExpression(expression) {
  console.log(expression);
  if (!expression.length) return 0;

  const numbers = [];
  const operators = [];

  let currentNumber = '';

  if (isNaN(expression[expression.length - 1])) {
    expression.pop();
  }
  expression.forEach((item) => {
    if (!isNaN(item)) {
      currentNumber += item;
    } else {
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = '';
      }
      operators.push(item);
    }
  });
  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const result =
        operators[i] === '*'
          ? Number((numbers[i] * numbers[i + 1]).toFixed(10))
          : numbers[i + 1] !== 0
            ? Number((numbers[i] / numbers[i + 1]).toFixed(10))
            : ERROR;

      if (result === ERROR || Number.isNaN(result)) {
        throw new Error(ERROR);
      }

      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result = Number((result + numbers[i + 1]).toFixed(10));
    } else if (operators[i] === '-') {
      result = Number((result - numbers[i + 1]).toFixed(10));
    }
  }

  return result;
}
