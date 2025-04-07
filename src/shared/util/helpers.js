import { OPERATORS } from '@/shared/constant';

export function isOperator(value) {
  return Object.values(OPERATORS).includes(value);
}

export function isReplace(newValue, expression) {
  const lastValue = expression[expression.length - 1];
  const previousValue = expression[expression.length - 2];
  const isLastValueOperator = isOperator(lastValue);
  const isPreviousValueOperator = isOperator(previousValue);
  const isNewValueOperator = isOperator(newValue);

  if (!isLastValueOperator || !isNewValueOperator) return false;

  if (newValue !== OPERATORS.MINUS) {
    return true;
  }

  return (
    lastValue === OPERATORS.MINUS || (isPreviousValueOperator && lastValue !== OPERATORS.MINUS)
  );
}
