import { ERROR } from '@/shared/constant';

export function calculateExpression(expression) {
  if (!expression.length) return 0;

  const numbers = [];
  const OPTIONS = [];

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
      OPTIONS.push(item);
    }
  });
  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  for (let i = 0; i < OPTIONS.length; i++) {
    if (OPTIONS[i] === '*' || OPTIONS[i] === '/') {
      const result =
        OPTIONS[i] === '*'
          ? Number((numbers[i] * numbers[i + 1]).toFixed(10))
          : numbers[i + 1] !== 0
            ? Number((numbers[i] / numbers[i + 1]).toFixed(10))
            : ERROR;

      if (result === ERROR || Number.isNaN(result)) {
        throw new Error(ERROR);
      }

      numbers.splice(i, 2, result);
      OPTIONS.splice(i, 1);
      i--;
    }
  }

  let result = numbers[0];
  for (let i = 0; i < OPTIONS.length; i++) {
    if (OPTIONS[i] === '+') {
      result = Number((result + numbers[i + 1]).toFixed(10));
    } else if (OPTIONS[i] === '-') {
      result = Number((result - numbers[i + 1]).toFixed(10));
    }
  }

  return result;
}
