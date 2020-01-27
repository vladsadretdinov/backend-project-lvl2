/* eslint-disable no-param-reassign */

import _ from 'lodash';
import parseFilesAsJSON from './parsers';

const configExceptedByAnother = (config, excepted) => _.reduce(config, (acc, value, key) => {
  if (!_.has(excepted, key)) {
    acc[key] = value;
  }
  return acc;
}, {});

const genDiff = (firstConfigPath, secondConfigPath) => {
  const {
    firstFileAsJSON: firstConfigAsJSON,
    secondFileAsJSON: secondConfigAsJSON,
    parseError,
  } = parseFilesAsJSON(firstConfigPath, secondConfigPath);

  if (parseError !== null) {
    return parseError;
  }

  const dataThatOnlyAtSecondConfig = configExceptedByAnother(secondConfigAsJSON,
    firstConfigAsJSON);

  console.log(dataThatOnlyAtSecondConfig);

  let result = _.reduce(firstConfigAsJSON, (acc, value, key) => {
    if (_.has(secondConfigAsJSON, key)) {
      if (firstConfigAsJSON[key] === secondConfigAsJSON[key]) {
        acc += `    ${key}: ${value}\n`;
      } else {
        acc += `  - ${key}: ${value}\n`;
        acc += `  + ${key}: ${secondConfigAsJSON[key]}\n`;
      }
    } else {
      acc += `  - ${key}: ${value}\n`;
    }
    return acc;
  }, '{\n');

  _.forEach(dataThatOnlyAtSecondConfig, (value, key) => {
    result += `  + ${key}: ${value}\n`;
  });

  result += '}';

  return result;
};

export default genDiff;
