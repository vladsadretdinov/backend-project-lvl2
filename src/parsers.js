import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';

const readFile = (pathToFile) => {
  try {
    return {
      fileContent: fs.readFileSync(pathToFile, 'utf8'),
      fileContentError: null,
    };
  } catch (error) {
    return {
      fileContent: null,
      fileContentError: `Can't read file '${pathToFile}'`,
    };
  }
};

const createPath = (pathToFile) => path.join(path.dirname(pathToFile), path.basename(pathToFile));

const isFileFormatSupported = (fileFormat) => {
  const supportedFileFormats = ['.json', '.yaml'];
  return supportedFileFormats.includes(fileFormat);
};

const getParsedContentAsJSON = (content, format) => {
  try {
    return {
      contentAsJSON: format === '.json' ? JSON.parse(content) : safeLoad(content),
      contentAsJSONError: null,
    };
  } catch (error) {
    return {
      contentAsJSON: null,
      contentAsJSONError: error,
    };
  }
};


const getFileFormat = (filePath) => {
  const fileFormat = path.extname(filePath);
  if (!isFileFormatSupported(fileFormat)) {
    return {
      fileFormat: null,
      fileFormatError: `File '${filePath}' has unsupported format`,
    };
  }
  return {
    fileFormat,
    fileFormatError: null,
  };
};

export default (firstFilePath, secondFilePath) => {
  const parserResponse = {
    firstFileAsJSON: null,
    secondFileAsJSON: null,
    parseError: null,
  };

  const {
    fileFormat: firstFileFormat,
    fileFormatError: firstFileFormatError,
  } = getFileFormat(firstFilePath);

  if (firstFileFormatError !== null) {
    return { ...parserResponse, parseError: firstFileFormatError };
  }
  console.log(`First file has '${firstFileFormat}' format`);

  const {
    fileFormat: secondFileFormat,
    fileFormatError: secondFileFormatError,
  } = getFileFormat(secondFilePath);

  if (secondFileFormatError !== null) {
    return { ...parserResponse, parseError: secondFileFormatError };
  }
  console.log(`Second file has '${secondFileFormat}' format`);


  const {
    fileContent: firstFileContent,
    fileContentError: firstFileContentError,
  } = readFile(createPath(firstFilePath));

  if (firstFileContentError !== null) {
    return { ...parserResponse, parseError: firstFileContentError };
  }
  console.log('First file read successfully');

  const {
    fileContent: secondFileContent,
    fileContentError: secondFileContentError,
  } = readFile(createPath(secondFilePath));

  if (secondFileContentError !== null) {
    return { ...parserResponse, parseError: secondFileContentError };
  }
  console.log('Second file read successfully');


  const {
    contentAsJSON: firstFileAsJSON,
    contentAsJSONError: firstFileAsJSONError,
  } = getParsedContentAsJSON(firstFileContent, firstFileFormat);

  if (firstFileAsJSONError !== null) {
    return { ...parserResponse, parseError: `Can't parse file '${firstFilePath}' as JSON` };
  }
  console.log('First file parsed as JSON successfully');

  const {
    contentAsJSON: secondFileAsJSON,
    contentAsJSONError: secondFileAsJSONError,
  } = getParsedContentAsJSON(secondFileContent, secondFileFormat);
  if (secondFileAsJSONError !== null) {
    return { ...parserResponse, parseError: `Can't parse file '${secondFilePath}' as JSON` };
  }
  console.log('Second file parsed as JSON successfully');

  return { ...parserResponse, firstFileAsJSON, secondFileAsJSON };
};
