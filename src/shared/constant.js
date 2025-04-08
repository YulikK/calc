export const OPTIONS = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUALS: 'RESULT',
  CLEAR: 'CLEAR',
  DELETE: 'DELETE',
  COMMA: '.',
  COPY: 'COPY',
  SIGN: 'SIGN',
  PERCENT: '%',
};

export const MAX_SCORE_OPERATIONS = [OPTIONS.MULTIPLY, OPTIONS.DIVIDE, OPTIONS.PERCENT];

export const START_VALUE = '0';

export const ERROR = 'ERROR';

export const BUTTON_TYPE = {
  NUMBER: 'number',
  OPERATION: 'operation',
};

export const STATES = {
  READY: 'ready',
  RESULT: 'result',
  ERROR: 'error',
};

export const OPTION_BUTTONS = {
  plus: {
    value: OPTIONS.PLUS,
    src: new URL('./assets/plus.png', import.meta.url).href,
    alt: 'Plus',
    ariaLabel: 'Add numbers',
    title: 'Add',
  },
  minus: {
    value: OPTIONS.MINUS,
    src: new URL('./assets/minus.png', import.meta.url).href,
    alt: 'Minus',
    ariaLabel: 'Subtract numbers',
    title: 'Subtract',
  },
  multiply: {
    value: OPTIONS.MULTIPLY,
    src: new URL('./assets/multiply.png', import.meta.url).href,
    alt: 'Multiply',
    ariaLabel: 'Multiply numbers',
    title: 'Multiply',
  },
  divide: {
    value: OPTIONS.DIVIDE,
    src: new URL('./assets/divide.png', import.meta.url).href,
    alt: 'Divide',
    ariaLabel: 'Divide numbers',
    title: 'Divide',
  },
  equals: {
    value: OPTIONS.EQUALS,
    src: new URL('./assets/equals.png', import.meta.url).href,
    alt: 'Equals',
    ariaLabel: 'Calculate result',
    title: 'Calculate',
  },
  comma: {
    value: OPTIONS.COMMA,
    src: new URL('./assets/comma.png', import.meta.url).href,
    alt: 'Decimal point',
    ariaLabel: 'Add decimal point',
    title: 'Decimal point',
  },
  clear: {
    value: OPTIONS.CLEAR,
    src: new URL('./assets/clear.png', import.meta.url).href,
    alt: 'Clear',
    ariaLabel: 'Clear last digit',
    title: 'Clear last digit',
  },
  delete: {
    value: OPTIONS.DELETE,
    src: new URL('./assets/delete.png', import.meta.url).href,
    alt: 'Delete',
    ariaLabel: 'Delete all',
    title: 'Delete all',
  },
  copy: {
    value: OPTIONS.COPY,
    src: new URL('./assets/copy.png', import.meta.url).href,
    alt: 'Copy',
    ariaLabel: 'Copy result to clipboard',
    title: 'Copy to clipboard',
  },
  sign: {
    value: OPTIONS.SIGN,
    src: new URL('./assets/sign.png', import.meta.url).href,
    alt: 'Change sign',
    ariaLabel: 'Change number sign',
    title: 'Change sign',
  },
  percent: {
    value: OPTIONS.PERCENT,
    src: new URL('./assets/percent.png', import.meta.url).href,
    alt: 'Percent',
    ariaLabel: 'Convert to percentage',
    title: 'Percentage',
  },
};

export const KEY_MAPPINGS = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  '+': OPTIONS.PLUS,
  '-': OPTIONS.MINUS,
  '*': OPTIONS.MULTIPLY,
  '/': OPTIONS.DIVIDE,
  '%': OPTIONS.PERCENT,
  Enter: OPTIONS.EQUALS,
  '=': OPTIONS.EQUALS,
  Backspace: OPTIONS.CLEAR,
  Delete: OPTIONS.DELETE,
  '.': OPTIONS.COMMA,
  ',': OPTIONS.COMMA,
  c: OPTIONS.COPY,
  Escape: OPTIONS.DELETE,
};

export const COPY_MSG = 'Copied to clipboard!';
