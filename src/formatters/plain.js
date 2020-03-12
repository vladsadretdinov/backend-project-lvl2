import { has, isObject, isString } from 'lodash';

const helperFunc = (value) => {
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
      acc.push(`Property '${parent}${key}' was changed from ${helperFunc(beforeValue)} to ${helperFunc(afterValue)}\n`);
      break;
    case 'deleted':
      acc.push(`Property '${parent}${key}' was deleted\n`);
      break;
    case 'added':
      acc.push(`Property '${parent}${key}' was added with value: ${helperFunc(value)}\n`);
      break;
    default:
      // ~ case 'remained'
      acc.push(`Property '${parent}${key}' was remained\n`);
      if (has(element, 'children')) {
        acc.push(render(children, `${parent}${key}.`));
      }
      break;
  }
  return acc;
}, []).join('');

export default (ast) => `${render(ast, '').slice(0, -1)}`;
