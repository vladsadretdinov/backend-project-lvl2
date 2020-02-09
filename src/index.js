import getRenderStyle from './formatters';
import parseFileAsJSON from './parsers';
import { readFile, getFileFormat, createPath } from './helpers';
import getAST from './getAST';

export default (firstConfigPath, secondConfigPath, format) => {
  const {
    fileFormat: firstFileFormat,
    fileFormatError: firstFileFormatError,
  } = getFileFormat(firstConfigPath);

  if (firstFileFormatError !== null) {
    return `File '${createPath(firstConfigPath)}' has unsupported format`;
  }

  const {
    fileFormat: secondFileFormat,
    fileFormatError: secondFileFormatError,
  } = getFileFormat(secondConfigPath);

  if (secondFileFormatError !== null) {
    return `File '${createPath(secondConfigPath)}' has unsupported format`;
  }

  const {
    fileContent: firstFileContent,
    fileContentError: firstFileContentError,
  } = readFile(createPath(firstConfigPath));

  if (firstFileContentError !== null) {
    return `Can't read file '${createPath(firstConfigPath)}'`;
  }

  const {
    fileContent: secondFileContent,
    fileContentError: secondFileContentError,
  } = readFile(createPath(secondConfigPath));

  if (secondFileContentError !== null) {
    return `Can't read file '${createPath(secondConfigPath)}'`;
  }

  const {
    fileContentAsJSON: firstFileAsJSON,
    fileContentJSONError: firstFileAsJSONError,
  } = parseFileAsJSON(firstFileContent, firstFileFormat);

  if (firstFileAsJSONError !== null) {
    return `Can't parse file '${createPath(firstConfigPath)}' as JSON`;
  }

  const {
    fileContentAsJSON: secondFileAsJSON,
    fileContentJSONError: secondFileAsJSONError,
  } = parseFileAsJSON(secondFileContent, secondFileFormat);

  if (secondFileAsJSONError !== null) {
    return `Can't parse file '${createPath(secondConfigPath)}' as JSON`;
  }

  const ast = getAST(firstFileAsJSON, secondFileAsJSON);

  const render = getRenderStyle(format);

  return render(ast);
};
