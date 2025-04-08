import { ERROR, MAX_SCORE_OPERATIONS, OPTIONS } from '@/shared/constant';

function formatNumber(value) {
  return Number(value.toFixed(10));
}

export function calculateExpression(expression) {
  if (!expression.length) return 0;

  const numbers = [];
  const options = [];

  let currentNumber = '';
  const lastItem = expression[expression.length - 1];

  if (isNaN(parseFloat(lastItem.replace(OPTIONS.PERCENT, '')))) {
    expression.pop();
  }

  expression.forEach((item) => {
    if (typeof item === 'string' && item.includes(OPTIONS.PERCENT)) {
      const number = parseFloat(item.replace(OPTIONS.PERCENT, ''));
      numbers.push(number / 100);
    } else if (!isNaN(parseFloat(item))) {
      currentNumber += item;
    } else if (currentNumber) {
      numbers.push(parseFloat(currentNumber));
      currentNumber = '';
    }

    if (isNaN(parseFloat(item)) && !item.includes(OPTIONS.PERCENT) && item !== OPTIONS.PERCENT) {
      options.push(item);
    }
  });

  if (currentNumber) {
    numbers.push(parseFloat(currentNumber));
  }

  for (let i = 0; i < options.length; i++) {
    if (MAX_SCORE_OPERATIONS.includes(options[i])) {
      let result;
      switch (options[i]) {
        case OPTIONS.PERCENT:
          result = formatNumber(numbers[i] / 100);
          break;

        case OPTIONS.MULTIPLY:
          result = formatNumber(numbers[i] * numbers[i + 1]);
          break;

        case OPTIONS.DIVIDE:
          result = formatNumber(numbers[i] / numbers[i + 1]);
          break;
      }
      if (Number.isNaN(result) || !Number.isFinite(result)) {
        throw new Error(ERROR);
      }

      numbers.splice(i, 2, result);
      options.splice(i, 1);
      i--;
    }
  }

  let result = numbers[0];
  for (let i = 0; i < options.length; i++) {
    if (options[i] === '+') {
      result = formatNumber(result + numbers[i + 1]);
    } else if (options[i] === '-') {
      result = formatNumber(result - numbers[i + 1]);
    }
  }

  return result;
}
