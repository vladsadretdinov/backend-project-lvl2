import { isObject, flattenDeep, map } from 'lodash';

const TAB_SIZE = 4;

const transformValueToPrintFormat = (sign, key, value, depth) => {
  if (!isObject(value)) {
    return `${' '.repeat(depth * TAB_SIZE - 2)}${sign} ${key}: ${value}`;
  }
  return [
    `${' '.repeat(depth * TAB_SIZE - 2)}${sign} ${key}: {`,
    map(value, (objValue, objKey) => `${' '.repeat(depth * TAB_SIZE + TAB_SIZE)}${objKey}: ${objValue}`),
    `${' '.repeat(depth * TAB_SIZE)}}`,
  ];
};

const render = (ast, depth = 1) => {
  const result = ast.reduce((acc, element) => {
    const {
      state, key, beforeValue, value, afterValue, children,
    } = element;
    switch (state) {
      case 'changed':
        return [...acc, transformValueToPrintFormat('-', key, beforeValue, depth), transformValueToPrintFormat('+', key, afterValue, depth)];
      case 'deleted':
        return [...acc, transformValueToPrintFormat('-', key, value, depth)];
      case 'added':
        return [...acc, transformValueToPrintFormat('+', key, value, depth)];
      case 'remained':
        return [...acc, transformValueToPrintFormat(' ', key, value, depth)];
      case 'nested':
        return [
          ...acc,
          `${' '.repeat(depth * TAB_SIZE - 2)}  ${key}: {`,
          render(children, depth + 1),
          `${' '.repeat(depth * TAB_SIZE)}}`,
        ];
      default:
        throw new Error(`Unknown state in AST! (key: '${key}', state:'${state}')`);
    }
  }, []);
  return flattenDeep(result).join('\n');
};

export default (ast) => `{\n${render(ast)}\n}`;
