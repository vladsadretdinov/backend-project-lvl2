/* eslint-disable no-param-reassign */

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const createPath = (pathToFile) => path.join(path.dirname(pathToFile), path.basename(pathToFile));

const configExceptedByAnother = (config, excepted) => _.reduce(config, (acc, value, key) => {
  if (!_.has(excepted, key)) {
    acc[key] = value;
  }
  return acc;
}, {});

const genDiff = (firstConfigPath, secondConfigPath) => {
  let firstConfigContent;
  let secondConfigContent;
  try {
    firstConfigContent = readFile(createPath(firstConfigPath));
  } catch (error) {
    return `Can't read file '${firstConfigPath}'`;
  }
  try {
    secondConfigContent = readFile(createPath(secondConfigPath));
  } catch (error) {
    return `Can't read file '${secondConfigPath}'`;
  }

  let firstConfigAsJSON;
  let secondConfigAsJSON;
  try {
    firstConfigAsJSON = JSON.parse(firstConfigContent);
  } catch (error) {
    return `Can't JSON parse file '${firstConfigPath}'`;
  }
  try {
    secondConfigAsJSON = JSON.parse(secondConfigContent);
  } catch (error) {
    return `Can't JSON parse file '${secondConfigPath}'`;
  }

  const dataThatOnlyAtSecondConfig = configExceptedByAnother(secondConfigAsJSON,
    firstConfigAsJSON);

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
