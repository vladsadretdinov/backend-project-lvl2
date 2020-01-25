import fs from 'fs';
import path from 'path';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf8');

const createPath = (pathToFile) => path.join(path.dirname(pathToFile), path.basename(pathToFile));

const isFileFormatsEqual = (firstConfigFormat, secondConfigFormat) => (
  firstConfigFormat === secondConfigFormat
);

const isFileFormatSupported = (fileFormat) => {
  const supportedFileFormats = ['json', 'yaml'];
  return supportedFileFormats.includes(fileFormat);
};

const getFilesFormat = (firstConfigPath, secondConfigPath) => {
  const firstConfigFormat = path.extname(firstConfigPath);
  const secondConfigFormat = path.extname(secondConfigPath);
  const response = {};

  if (!isFileFormatSupported(firstConfigPath)) {
    response.update({
      format: null,
      error: `First file has unsupported format '.${firstConfigFormat}'`,
    });
  } else if (!isFileFormatSupported(secondConfigPath)) {
    response.update({
      format: null,
      error: `Second file has unsupported format '.${secondConfigPath}'`,
    });
  }

  if (!isFileFormatsEqual(firstConfigFormat, secondConfigFormat)) {
    response.update({
      format: null,
      error: 'File formats must be equal',
    });
  } else if (firstConfigPath === 'json') {
    response.update({
      format: 'json',
      error: null,
    });
  } else {
    response.update({
      format: 'yaml',
      error: null,
    });
  }

  return response;
};

const getConfigAsJSON = (config) => {

};

export default (firstConfigPath, secondConfigPath) => {
  const response = {
    firstConfigAsJSON: null,
    secondConfigAsJSON: null,
    errorParse: null,
  };

  const { format: filesFormat, error: errorFilesFormat } = getFilesFormat(
    firstConfigPath, secondConfigPath,
  );

  if (errorFilesFormat === null) {
    response.update({
      errorParse: errorFilesFormat,
    });
    return response;
  }

  let firstConfigContent;
  let secondConfigContent;

  try {
    firstConfigContent = readFile(createPath(firstConfigPath));
    console.log('First file read successfully');
  } catch (error) {
    response.update({
      errorParse: `Can't read file '${firstConfigPath}'`,
    });
    return response;
  }
  try {
    secondConfigContent = readFile(createPath(secondConfigPath));
    console.log('Second file read successfully');
  } catch (error) {
    response.update({
      errorParse: `Can't read file '${secondConfigPath}'`,
    });
    return response;
  }

  let firstConfigAsJSON;
  let secondConfigAsJSON;
  try {
    firstConfigAsJSON = JSON.parse(firstConfigContent);
    console.log('First file parsed successfully');
  } catch (error) {
    response.update({
      errorParse: `Can't parse file '${firstConfigPath}'`,
    });
    return response;
  }
  try {
    secondConfigAsJSON = JSON.parse(secondConfigContent);
    console.log('Second file parsed successfully');
  } catch (error) {
    response.update({
      errorParse: `Can't parse file '${secondConfigPath}'`,
    });
    return response;
  }

  response.update = {
    firstConfigAsJSON,
    secondConfigAsJSON,
  };

  return response;
};
