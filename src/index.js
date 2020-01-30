import commander from 'commander';
import genDiff from './genDiff';

const program = commander;

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfigPath, secondConfigPath) => {
    console.log(genDiff(firstConfigPath, secondConfigPath));
  });

program.parse(process.argv);
process.exit(-1);
