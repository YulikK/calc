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
  },
  minus: {
    value: OPTIONS.MINUS,
    src: new URL('./assets/minus.png', import.meta.url).href,
  },
  multiply: {
    value: OPTIONS.MULTIPLY,
    src: new URL('./assets/multiply.png', import.meta.url).href,
  },
  divide: {
    value: OPTIONS.DIVIDE,
    src: new URL('./assets/divide.png', import.meta.url).href,
  },
  equals: {
    value: OPTIONS.EQUALS,
    src: new URL('./assets/equals.png', import.meta.url).href,
  },
  comma: {
    value: OPTIONS.COMMA,
    src: new URL('./assets/comma.png', import.meta.url).href,
  },
  clear: {
    value: OPTIONS.CLEAR,
    src: new URL('./assets/clear.png', import.meta.url).href,
  },
  delete: {
    value: OPTIONS.DELETE,
    src: new URL('./assets/delete.png', import.meta.url).href,
  },
  copy: {
    value: OPTIONS.COPY,
    src: new URL('./assets/copy.png', import.meta.url).href,
  },
  sign: {
    value: OPTIONS.SIGN,
    src: new URL('./assets/sign.png', import.meta.url).href,
  },
  percent: {
    value: OPTIONS.PERCENT,
    src: new URL('./assets/percent.png', import.meta.url).href,
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
