import { BUTTON_TYPE, OPTIONS, STATES, START_VALUE } from '@/shared/constant';

function isOperator(value) {
  return Object.values(OPTIONS).includes(value);
}

function isNumber(value) {
  const valueFormat = value.replace(OPTIONS.PERCENT, '');
  return !isNaN(parseFloat(valueFormat)) && isFinite(valueFormat);
}

function replaceLastItem(expression, value) {
  const newExpression = [...expression];
  newExpression[newExpression.length - 1] = value;
  return newExpression;
}

function addNewItem(expression, value) {
  return [...expression, value];
}

export function updateExpressionArray(expression, value) {
  const lastItem = expression[expression.length - 1];
  if (!lastItem) {
    return [...expression];
  }
  if (lastItem.includes(OPTIONS.PERCENT)) {
    return addNewItem(expression, value);
  }
  if (isOperator(lastItem)) {
    return replaceLastItem(expression, value);
  }
  if (isNumber(lastItem)) {
    return addNewItem(expression, value);
  }
}

export function updateExpressionWithComma(expression) {
  const lastItem = expression[expression.length - 1];
  const previousItem = expression[expression.length - 2];

  if (!lastItem || isOperator(lastItem)) {
    return addNewItem(expression, `${START_VALUE}${OPTIONS.COMMA}`);
  }

  if (lastItem && lastItem.includes(OPTIONS.PERCENT)) {
    return [...expression];
  }

  if (lastItem === OPTIONS.MINUS && isOperator(previousItem)) {
    return replaceLastItem(expression, `${OPTIONS.MINUS}${START_VALUE}${OPTIONS.COMMA}`);
  }

  if (!lastItem.includes(OPTIONS.COMMA)) {
    return replaceLastItem(expression, lastItem + OPTIONS.COMMA);
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
    const newValue = lastItem.slice(0, -1);
    if (newValue === OPTIONS.MINUS) {
      return expression.slice(0, -1);
    } else {
      return replaceLastItem(expression, newValue);
    }
  }

  return expression.slice(0, -1);
}

export function updateExpressionWithSign(expression) {
  const lastItem = expression[expression.length - 1];
  if (!lastItem || isOperator(lastItem)) {
    return [...expression];
  }

  if (isNumber(lastItem)) {
    if (lastItem.includes(OPTIONS.PERCENT)) {
      const number = parseFloat(lastItem.replace(OPTIONS.PERCENT, ''));
      return replaceLastItem(expression, String(-number) + OPTIONS.PERCENT);
    }
    return replaceLastItem(expression, String(Number(lastItem) * -1));
  }
}

export function updateExpressionWithMinus(expression) {
  const lastItem = expression[expression.length - 1];
  if (isOperator(lastItem)) {
    return replaceLastItem(expression, OPTIONS.MINUS);
  }
  if (isNumber(lastItem)) {
    return addNewItem(expression, OPTIONS.MINUS);
  }
}

export function updateExpressionWithNumber(expression, value) {
  const lastItem = expression[expression.length - 1];
  if (!lastItem) {
    return addNewItem(expression, value);
  }
  if (lastItem.includes(OPTIONS.PERCENT)) {
    return [...expression];
  }
  if (isOperator(lastItem)) {
    return addNewItem(expression, value);
  }
  if (isNumber(lastItem)) {
    return replaceLastItem(expression, lastItem + value);
  }
}

export function updateExpressionWithPercent(expression) {
  const lastItem = expression[expression.length - 1];
  if (!lastItem || isOperator(lastItem)) {
    return [...expression];
  }
  if (isNumber(lastItem)) {
    return replaceLastItem(expression, lastItem + OPTIONS.PERCENT);
  }
  if (lastItem.includes(OPTIONS.PERCENT)) {
    return replaceLastItem(expression, lastItem.replace(OPTIONS.PERCENT, ''));
  }
  return expression;
}
