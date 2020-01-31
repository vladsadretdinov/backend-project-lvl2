/* eslint-disable no-param-reassign */

import { has as _has, reduce as _reduce } from 'lodash';
import parseFilesAsJSON from './parsers';
import standard from './formatters/standard';

const getAST = (firstJSON, secondJSON) => {
  const mergedJSON = {
    ...firstJSON,
    ...secondJSON,
  };
  const result = _reduce(
    mergedJSON,
    (acc, value, key) => {
      if (_has(firstJSON, key) && _has(secondJSON, key)) {
        if (typeof value === typeof firstJSON[key] && typeof value === 'object') {
          acc.push({
            key,
            state: 'same',
            value: getAST(firstJSON[key], value),
          });
          return acc;
        }
        if (typeof value !== 'object' && typeof firstJSON[key] !== 'object') {
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
      }
      if (_has(secondJSON, key)) {
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
    },
    [],
  );
  return result;
};

const genDiff = (firstConfigPath, secondConfigPath, outputFormat = standard) => {
  const {
    firstFileAsJSON: firstConfigAsJSON,
    secondFileAsJSON: secondConfigAsJSON,
    parseError,
  } = parseFilesAsJSON(firstConfigPath, secondConfigPath);

  if (parseError !== null) {
    return parseError;
  }

  const ast = getAST(firstConfigAsJSON, secondConfigAsJSON);

  return outputFormat(ast);
};

export default genDiff;
