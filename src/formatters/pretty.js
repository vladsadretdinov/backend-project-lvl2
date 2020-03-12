import { forEach, isObject, has } from 'lodash';

const TAB_SIZE = 4;

const render = (ast, tabs = TAB_SIZE) => {
  const helperFunc = (sign, key, value) => {
    const result = [];

    result.push(`\n${' '.repeat(tabs - 2)}${sign} ${key}: `);

    if (!isObject(value)) {
      result.push(`${value}`);
      return result.join('');
    }

    result.push('{');
    if (sign === ' ') {
      result.push(render(value, tabs + TAB_SIZE));
    } else {
      forEach(value, (v, k) => {
        result.push(`\n${' '.repeat(tabs + TAB_SIZE)}${k}: ${v}`);
      });
    }
    result.push(`\n${' '.repeat(tabs)}}`);

    return result.join('');
  };

  return ast.reduce((acc, element) => {
    const {
      state, key, beforeValue, value, afterValue, children,
    } = element;
    switch (state) {
      case 'changed':
        acc.push(helperFunc('-', key, beforeValue, tabs));
        acc.push(helperFunc('+', key, afterValue, tabs));
        break;
      case 'deleted':
        acc.push(helperFunc('-', key, value, tabs));
        break;
      case 'added':
        acc.push(helperFunc('+', key, value, tabs));
        break;
      default:
        // ~ case 'remained'
        if (has(element, 'children')) {
          acc.push(helperFunc(' ', key, children, tabs));
        } else {
          acc.push(helperFunc(' ', key, value, tabs));
        }
        break;
    }
    return acc;
  }, []).join('');
};

export default (ast) => `{${render(ast)}\n}`;
