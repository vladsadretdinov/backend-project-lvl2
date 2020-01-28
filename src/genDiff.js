/* eslint-disable no-param-reassign */

import _ from 'lodash';
import parseFilesAsJSON from './parsers';

// const getASTWithoutAddedElements = (firstJSON, secondJSON) => _.reduce(
//   firstJSON, (acc, value, key) => {
//     acc.push({ key });
//     if (_.has(secondJSON, key)) {
//       acc[acc.length - 1].state = 'same';
//       if (typeof value === 'object' && typeof secondJSON[key] === 'object') {
//         acc[acc.length - 1].children = getASTWithoutAddedElements(value, secondJSON[key]);
//         return acc;
//       }
//       if (typeof value === 'object' || typeof secondJSON[key] === 'object') {
//         acc[acc.length - 1].state = 'changed';
//         acc[acc.length - 1].key = key;
//         acc[acc.length - 1].value = value;
//         acc[acc.length - 1].afterValue = secondJSON[key];
//         return acc;
//       }
//     }
//     if (typeof value !== 'object' && typeof secondJSON[key] !== 'object') {
//       acc[acc.length - 1].state = value === secondJSON[key] ? 'same' : 'changed';
//       acc[acc.length - 1].key = key;
//       acc[acc.length - 1].value = value;
//       if (value !== secondJSON[key]) {
//         acc[acc.length - 1].afterValue = secondJSON[key];
//       }
//       acc[acc.length - 1].state = secondJSON[key] === undefined ? 'deleted' : acc[acc.length - 1].state;
//       if (acc[acc.length - 1].state === 'deleted') {
//         delete acc[acc.length - 1].afterValue;
//       }
//       return acc;
//     }
//     acc[acc.length - 1].key = key;
//     acc[acc.length - 1].state = 'deleted';
//     if (typeof value === 'object') {
//       acc[acc.length - 1].children = value;
//     } else {
//       acc[acc.length - 1].value = value;
//     }
//     return acc;
//   }, [],
// console.log(mergedJSON);
// );

const getAST = (firstJSON, secondJSON) => {
  const mergedJSON = { ...firstJSON, ...secondJSON };
  const result = _.reduce(mergedJSON, (acc, value, key) => {
    if (_.has(firstJSON, key) && _.has(secondJSON, key)) {
      if (firstJSON[key] === value) {
        acc += `    ${key}: ${value}\n`;
      } else {
        acc += `  - ${key}: ${firstJSON[key]}\n`;
        acc += `  + ${key}: ${value}\n`;
      }
      return acc;
    } if (_.has(secondJSON, key)) {
      acc += `  + ${key}: ${value}\n`;
      return acc;
    }
    acc += `  - ${key}: ${value}\n`;
    return acc;
  }, '{\n');
  return `${result}}`;
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

  console.log('------otvet-------');
  console.log(JSON.stringify(result));
  console.log('------otvet-------');

  return result;
};

export default genDiff;
