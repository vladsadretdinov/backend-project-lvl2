#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../index';

const program = commander;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfigPath, secondConfigPath, cmdObj) => {
    console.log(genDiff(firstConfigPath, secondConfigPath, cmdObj.format));
  });

program.parse(process.argv);
process.exit(0);
