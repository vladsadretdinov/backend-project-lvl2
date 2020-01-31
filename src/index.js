import commander from 'commander';
import genDiff from './genDiff';
import formatFacade, { isValidFormat } from './formatters';

export default () => {
  const program = commander;

  program
    .version('0.1.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfigPath, secondConfigPath, cmdObj) => {
      if (!isValidFormat(cmdObj.format)) {
        console.log(`Invalid option "-f ${cmdObj.format}", please retry!`);
      } else {
        console.log(genDiff(firstConfigPath, secondConfigPath, formatFacade(cmdObj.format)));
      }
    });

  program.parse(process.argv);
  process.exit(0);
};
