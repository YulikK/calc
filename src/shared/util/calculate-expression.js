export function calculateExpression(expression) {
  if (!expression.length) return 0;

  const numbers = [];
  const operators = [];

  let currentNumber = '';
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
          ? numbers[i] * numbers[i + 1]
          : numbers[i + 1] !== 0
            ? numbers[i] / numbers[i + 1]
            : 'Error';

      if (result === 'Error') return 'Error';

      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      i--;
    }
  }

  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '-') {
      result -= numbers[i + 1];
    }
  }

  return result;
}
