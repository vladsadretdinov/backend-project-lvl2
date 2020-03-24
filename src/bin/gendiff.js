#!/usr/bin/env node

import commander from 'commander';
import { isValidFormat } from '../formatters';
import genDiff from '..';

const program = commander;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfigPath, secondConfigPath, cmdObj) => {
    if (!isValidFormat(cmdObj.format)) {
      console.log(`Invalid option "-f ${cmdObj.format}", please retry!`);
      process.exit();
    }
    console.log(genDiff(firstConfigPath, secondConfigPath, cmdObj.format));
  });

program.parse(process.argv);
