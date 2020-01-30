/* eslint-disable no-param-reassign */

import {
  has as _has,
  reduce as _reduce,
  forEach as _forEach,
} from 'lodash';
import parseFilesAsJSON from './parsers';

const getAST = (firstJSON, secondJSON) => {
  const mergedJSON = { ...firstJSON, ...secondJSON };
  const result = _reduce(mergedJSON, (acc, value, key) => {
    if (_has(firstJSON, key) && _has(secondJSON, key)) {
      if ((typeof value === typeof firstJSON[key]) && typeof value === 'object') {
        acc.push({
          key,
          state: 'same',
          value: getAST(firstJSON[key], value),
        });
        return acc;
      }
      if ((typeof value !== 'object') && (typeof firstJSON[key] !== 'object')) {
        if (value === firstJSON[key]) {
          acc.push({
            key,
            state: 'same',
            value,
          });
          return acc;
        }
      }
      acc.push({
        key,
        state: 'changed',
        beforeValue: firstJSON[key],
        value,
      });
      return acc;
    } if (_has(secondJSON, key)) {
      acc.push({
        key,
        state: 'added',
        value,
      });
      return acc;
    }
    acc.push({
      key,
      state: 'deleted',
      value,
    });
    return acc;
  }, []);
  return result;
};

const renderAST = (_ast) => {
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

const genDiff = (firstConfigPath, secondConfigPath) => {
  const {
    firstFileAsJSON: firstConfigAsJSON,
    secondFileAsJSON: secondConfigAsJSON,
    parseError,
  } = parseFilesAsJSON(firstConfigPath, secondConfigPath);

  if (parseError !== null) {
    return parseError;
  }

  const result = getAST(firstConfigAsJSON, secondConfigAsJSON);

  return renderAST(result);
};

export default genDiff;
