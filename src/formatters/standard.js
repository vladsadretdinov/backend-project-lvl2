/* eslint-disable no-param-reassign */

import { forEach as _forEach } from 'lodash';

export default (_ast) => {
  const TAB_SIZE = 4;

  const renderHelper = (sign, key, value, tabs, subobj = false) => {
    let str = `\n${' '.repeat(tabs - 2)}${sign} ${key}: `;
    if (typeof value === 'object') {
      str += '{';
      if (subobj) {
        // eslint-disable-next-line no-use-before-define
        str += render(value, tabs + TAB_SIZE);
      } else {
        _forEach(value, (v, k) => {
          str += `\n${' '.repeat(tabs + TAB_SIZE)}${k}: ${v}`;
        });
      }
      str += `\n${' '.repeat(tabs)}}`;
    } else {
      str += `${value}`;
    }
    return str;
  };

  const render = (ast, tabs = TAB_SIZE) => ast.reduce((acc, element) => {
    switch (element.state) {
      case 'changed':
        acc += renderHelper('-', element.key, element.beforeValue, tabs);
        acc += renderHelper('+', element.key, element.value, tabs);
        break;
      case 'deleted':
        acc += renderHelper('-', element.key, element.value, tabs);
        break;
      case 'added':
        acc += renderHelper('+', element.key, element.value, tabs);
        break;
      default:
        acc += renderHelper(' ', element.key, element.value, tabs, true);
        break;
    }
    return acc;
  }, '');

  return `{${render(_ast)}\n}`;
};
