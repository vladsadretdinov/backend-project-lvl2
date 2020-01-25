/* eslint-disable no-param-reassign */
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => {
  let fileContent = null;
  try {
    fileContent = fs.readFileSync(pathToFile, 'utf8');
  } catch (error) {
    console.log(`Can't read file '${pathToFile}'`);
    process.exit();
  }
  return fileContent;
};

const createPath = (pathToFile) => path.join(process.cwd(), pathToFile);

const configExceptedByAnother = (config, excepted) => _.reduce(config, (acc, value, key) => {
  if (!_.has(excepted, key)) {
    acc[key] = value;
  }
  return acc;
}, {});

const program = commander;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfigPath, secondConfigPath) => {
    const firstConfigContent = readFile(createPath(firstConfigPath));
    const secondConfigContent = readFile(createPath(secondConfigPath));

    const firstConfigAsJSON = JSON.parse(firstConfigContent);
    const secondConfigAsJSON = JSON.parse(secondConfigContent);

    const dataThatOnlyAtFirstConfig = configExceptedByAnother(firstConfigAsJSON,
      secondConfigAsJSON);
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
      } else if (_.has(dataThatOnlyAtFirstConfig, key)) {
        acc += `  - ${key}: ${value}\n`;
      }
      return acc;
    }, '{\n');

    _.forEach(dataThatOnlyAtSecondConfig, (value, key) => {
      result += `  + ${key}: ${value}\n`;
    });

    result += '}';

    console.log(result);
    process.exit();
  });

program.parse(process.argv);
process.exit();

export default program;
