export const OPERATORS = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLY: '*',
  DIVIDE: '/',
  EQUALS: 'RESULT',
  CLEAR: 'CLEAR',
  DELETE: 'DELETE',
  COMMA: '.',
  COPY: 'COPY',
};

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

export const OPERATIONS = {
  plus: {
    value: OPERATORS.PLUS,
    src: new URL('./assets/plus.png', import.meta.url).href,
  },
  minus: {
    value: OPERATORS.MINUS,
    src: new URL('./assets/minus.png', import.meta.url).href,
  },
  multiply: {
    value: OPERATORS.MULTIPLY,
    src: new URL('./assets/multiply.png', import.meta.url).href,
  },
  divide: {
    value: OPERATORS.DIVIDE,
    src: new URL('./assets/divide.png', import.meta.url).href,
  },
  equals: {
    value: OPERATORS.EQUALS,
    src: new URL('./assets/equals.png', import.meta.url).href,
  },
  comma: {
    value: OPERATORS.COMMA,
    src: new URL('./assets/comma.png', import.meta.url).href,
  },
  clear: {
    value: OPERATORS.CLEAR,
    src: new URL('./assets/clear.png', import.meta.url).href,
  },
  delete: {
    value: OPERATORS.DELETE,
    src: new URL('./assets/delete.png', import.meta.url).href,
  },
  copy: {
    value: OPERATORS.COPY,
    src: new URL('./assets/copy.png', import.meta.url).href,
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
  '+': OPERATORS.PLUS,
  '-': OPERATORS.MINUS,
  '*': OPERATORS.MULTIPLY,
  '/': OPERATORS.DIVIDE,
  Enter: OPERATORS.EQUALS,
  '=': OPERATORS.EQUALS,
  Backspace: OPERATORS.CLEAR,
  Delete: OPERATORS.DELETE,
  '.': OPERATORS.COMMA,
  ',': OPERATORS.COMMA,
  c: OPERATORS.COPY,
};

export const COPY_MSG = 'Copied to clipboard!';
