import { BUTTON_TYPE, OPTIONS, STATES, START_VALUE } from '@/shared/constant';

function isOperator(value) {
  return Object.values(OPTIONS).includes(value);
}

export function updateExpressionArray(expression, value) {
  const lastItem = expression[expression.length - 1];
  const previousItem = expression[expression.length - 2];
  const isLastItemOperator = isOperator(lastItem);
  const isPreviousItemOperator = isOperator(previousItem);

  if (!isOperator(value)) {
    if (!lastItem || !isLastItemOperator) {
      if (lastItem && !isNaN(parseFloat(lastItem))) {
        expression[expression.length - 1] += value;
        return [...expression];
      }
      return [...expression, value];
    }
    if (lastItem === OPTIONS.MINUS && isPreviousItemOperator) {
      expression[expression.length - 1] += value;
      return [...expression];
    }
    return [...expression, value];
  }

  if (value === OPTIONS.MINUS) {
    if (!isLastItemOperator) {
      return [...expression, value];
    }
    if (lastItem === OPTIONS.MULTIPLY || lastItem === OPTIONS.DIVIDE) {
      return [...expression, value];
    }
  }

  if (isLastItemOperator) {
    if (isPreviousItemOperator) {
      expression.pop();
    }
    expression[expression.length - 1] = value;
    return [...expression];
  }

  return [...expression, value];
}

export function updateExpressionWithComma(expression) {
  const lastItem = expression[expression.length - 1];
  const previousItem = expression[expression.length - 2];

  if (lastItem === OPTIONS.MINUS && isOperator(previousItem)) {
    const newExpression = [...expression];
    newExpression[newExpression.length - 1] = `-${START_VALUE}${OPTIONS.COMMA}`;
    return newExpression;
  }

  if (!lastItem || isOperator(lastItem)) {
    return [...expression, `${START_VALUE}${OPTIONS.COMMA}`];
  }

  if (lastItem === OPTIONS.MINUS && isOperator(previousItem)) {
    const newExpression = [...expression];
    newExpression[newExpression.length - 1] += `${START_VALUE}${OPTIONS.COMMA}`;
    return newExpression;
  }

  if (!lastItem.includes(OPTIONS.COMMA)) {
    const newExpression = [...expression];
    newExpression[newExpression.length - 1] += OPTIONS.COMMA;
    return newExpression;
  }

  return expression;
}

export function getCalcState(currentStage, buttonType) {
  const states = {
    [STATES.RESULT]: {
      [BUTTON_TYPE.OPERATION]: { stage: STATES.READY, expression: null },
      [BUTTON_TYPE.NUMBER]: { stage: STATES.READY, expression: [] },
    },
    [STATES.ERROR]: {
      default: { stage: STATES.READY, expression: [START_VALUE] },
    },
  };

  return (
    states[currentStage]?.[buttonType] ||
    states[currentStage]?.default || { stage: currentStage, expression: null }
  );
}

export function clearLastValue(expression) {
  if (!expression.length) return [];

  const lastItem = expression[expression.length - 1];
  if (lastItem.length > 1) {
    const newExpression = [...expression];
    newExpression[newExpression.length - 1] = lastItem.slice(0, -1);
    return newExpression;
  }

  return expression.slice(0, -1);
}
