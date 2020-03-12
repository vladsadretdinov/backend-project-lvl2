import { forEach, isObject, flattenDeep } from 'lodash';

const TAB_SIZE = 4;

const transformValueToPrintFormat = (sign, key, value, tabs) => {
  const printArray = [];
  if (!isObject(value)) {
    printArray.push(`${' '.repeat(tabs - 2)}${sign} ${key}: ${value}`);
  } else {
    printArray.push(`${' '.repeat(tabs - 2)}${sign} ${key}: {`);
    forEach(value, (_value_, _key_) => {
      printArray.push(`${' '.repeat(tabs + TAB_SIZE)}${_key_}: ${_value_}`);
    });
    printArray.push(`${' '.repeat(tabs)}}`);
  }
  return printArray;
};

const render = (ast, tabs = TAB_SIZE) => {
  const result = ast.reduce((acc, element) => {
    const {
      state, key, beforeValue, value, afterValue, children,
    } = element;
    switch (state) {
      case 'changed':
        acc.push(transformValueToPrintFormat('-', key, beforeValue, tabs));
        acc.push(transformValueToPrintFormat('+', key, afterValue, tabs));
        break;
      case 'deleted':
        acc.push(transformValueToPrintFormat('-', key, value, tabs));
        break;
      case 'added':
        acc.push(transformValueToPrintFormat('+', key, value, tabs));
        break;
      case 'remained':
        acc.push(transformValueToPrintFormat(' ', key, value, tabs));
        break;
      case 'nested':
        acc.push(`${' '.repeat(tabs - 2)}  ${key}: {`);
        acc.push(render(children, tabs + TAB_SIZE));
        acc.push(`${' '.repeat(tabs)}}`);
        break;
      default:
        break;
    }
    return acc;
  }, []);

  return flattenDeep(result).join('\n');
};

export default (ast) => `{\n${render(ast)}\n}`;
