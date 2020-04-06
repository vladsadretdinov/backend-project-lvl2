import { isObject, isString, flattenDeep } from 'lodash';

const transformValueToPrintFormat = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const render = (ast, parent = '') => {
  const result = ast.map((element) => {
    const {
      state, key, beforeValue, value, afterValue, children,
    } = element;

    switch (state) {
      case 'changed':
        return `Property '${parent}${key}' was changed from ${transformValueToPrintFormat(beforeValue)} to ${transformValueToPrintFormat(afterValue)}`;
      case 'deleted':
        return `Property '${parent}${key}' was deleted`;
      case 'added':
        return `Property '${parent}${key}' was added with value: ${transformValueToPrintFormat(value)}`;
      case 'remained':
        return `Property '${parent}${key}' was remained`;
      case 'nested':
        return [`Property '${parent}${key}' was remained`, render(children, `${parent}${key}.`)];
      default:
        throw new Error(`Unknown state in AST! (key: '${key}', state: '${state}')`);
    }
  });

  return flattenDeep(result).join('\n');
};

export default (ast) => `${render(ast)}`;
