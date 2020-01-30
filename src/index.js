import commander from 'commander';
import genDiff from './genDiff';

export default () => {
  const program = commander;

  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfigPath, secondConfigPath, cmdObj) => {
      console.log(cmdObj.format);
      console.log(genDiff(firstConfigPath, secondConfigPath, cmdObj.format));
    });

  program.parse(process.argv);
  process.exit(0);
};
