/* eslint-disable no-param-reassign */

import {
  has as _has,
  reduce as _reduce,
  // forEach as _forEach,
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
          children: getAST(firstJSON[key], value),
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
        afterValue: value,
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

// const getASTValueToPrint = (value) => {
//   if (typeof value !== 'object') {
//     return `${value}\n`;
//   }
//   return `{\n        ${value.key}: ${value.value}`;
// };

// const renderedAST = (ast) => ast.reduce((acc, value) => {
//   switch (value.state) {
//     case 'same':
//       acc += `    ${value.key}: `;
//       return acc;
//     case 'deleted':
//       acc += `\n  - ${value.key}: `;
//       if (typeof value.value !== 'object') {
//         acc += `${value.value}`;
//       } else {
//         acc += '{\n';
//         _forEach(value.value, (v, k) => {
//           acc += `        ${k}: ${v}\n`;
//         });
//         acc += '    }';
//       }
//       return acc;
//     case 'changed':
//       acc += `  - ${value.key}: `;
//       acc += `  + ${value.key}: `;
//       return acc;
//     case 'added':
//       acc += `\n  + ${value.key}: `;
//       if (typeof value.value !== 'object') {
//         acc += `${value.value}`;
//       } else {
//         acc += '{\n';
//         _forEach(value.value, (v, k) => {
//           acc += `        ${k}: ${v}\n`;
//         });
//         acc += '    }';
//       }
//       return acc;
//     default:
//       acc += `    ${value.key}: `;
//       return acc;
//   }
// }, '{\n');

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

  // console.log('------otvet-------');
  // console.log(JSON.stringify(result));
  // console.log('------otvet-------');

  // console.log('------otvet2-------');
  // console.log(JSON.stringify(res2));
  // console.log('------otvet2-------');

  return result;
};

export default genDiff;
