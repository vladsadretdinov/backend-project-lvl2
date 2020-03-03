import getRenderStyle from './formatters';
import parseFile from './parsers';
import { readFile, getFileFormat, createFullFilePath } from './helpers';
import getAST from './getAST';

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const firstFileFormat = getFileFormat(firstConfigPath);
  const secondFileFormat = getFileFormat(secondConfigPath);

  const firstFileContent = readFile(createFullFilePath(firstConfigPath));
  const secondFileContent = readFile(createFullFilePath(secondConfigPath));

  const firstFileContentAsObj = parseFile(firstFileContent, firstFileFormat);
  const secondFileContentAsObj = parseFile(secondFileContent, secondFileFormat);

  const ast = getAST(firstFileContentAsObj, secondFileContentAsObj);

  const renderFunc = getRenderStyle(outputFormat);

  return renderFunc(ast);
};
