import getRenderStyle from './formatters';
import parseFileAsJSON from './parsers';
import { readFile, getFileFormat, createFullFilePath } from './helpers';
import getAST from './getAST';

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const firstFileFormat = getFileFormat(firstConfigPath);
  const secondFileFormat = getFileFormat(secondConfigPath);

  const firstFileContent = readFile(createFullFilePath(firstConfigPath));
  const secondFileContent = readFile(createFullFilePath(secondConfigPath));

  const firstFileContentAsJSON = parseFileAsJSON(firstFileContent, firstFileFormat);
  const secondFileContentAsJSON = parseFileAsJSON(secondFileContent, secondFileFormat);

  const ast = getAST(firstFileContentAsJSON, secondFileContentAsJSON);

  const render = getRenderStyle(outputFormat);

  return render(ast);
};
