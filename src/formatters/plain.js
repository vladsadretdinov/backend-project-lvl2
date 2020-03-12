import { isObject, isString } from 'lodash';

const getValueInPrintFormat = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const render = (ast, parent) => ast.reduce((acc, element) => {
  const {
    state, key, beforeValue, value, afterValue, children,
  } = element;

  switch (state) {
    case 'changed':
      acc.push(`Property '${parent}${key}' was changed from ${getValueInPrintFormat(beforeValue)} to ${getValueInPrintFormat(afterValue)}`);
      break;
    case 'deleted':
      acc.push(`Property '${parent}${key}' was deleted`);
      break;
    case 'added':
      acc.push(`Property '${parent}${key}' was added with value: ${getValueInPrintFormat(value)}`);
      break;
    case 'remained':
      acc.push(`Property '${parent}${key}' was remained`);
      break;
    case 'nested':
      acc.push(`Property '${parent}${key}' was remained`);
      acc.push(render(children, `${parent}${key}.`));
      break;
    default:
      break;
  }
  return acc;
}, []).join('\n');

export default (ast) => `${render(ast, '')}`;
