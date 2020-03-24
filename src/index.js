import getRenderStyle from './formatters';
import parseContent from './parsers';
import { readFile, getFileFormat } from './helpers';
import getAST from './getAST';

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const firstFileFormat = getFileFormat(firstConfigPath);
  const secondFileFormat = getFileFormat(secondConfigPath);

  const firstFileContent = readFile(firstConfigPath);
  const secondFileContent = readFile(secondConfigPath);

  const firstFileContentAsObj = parseContent(firstFileContent, firstFileFormat);
  const secondFileContentAsObj = parseContent(secondFileContent, secondFileFormat);

  const ast = getAST(firstFileContentAsObj, secondFileContentAsObj);

  const renderFunc = getRenderStyle(outputFormat);

  return renderFunc(ast);
};
