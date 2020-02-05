import getRenderStyle, { isValidFormat } from './formatters';
import parseFilesAsJSON from './parsers';
import getAST from './getAST';

export default (firstConfigPath, secondConfigPath, format) => {
  if (!isValidFormat(format)) {
    return `Invalid option "-f ${format}", please retry!`;
  }

  const {
    firstFileAsJSON: firstConfigAsJSON,
    secondFileAsJSON: secondConfigAsJSON,
    parseError,
  } = parseFilesAsJSON(firstConfigPath, secondConfigPath);

  if (parseError !== null) {
    return parseError;
  }

  const ast = getAST(firstConfigAsJSON, secondConfigAsJSON);

  const render = getRenderStyle(format);

  return render(ast);
};
