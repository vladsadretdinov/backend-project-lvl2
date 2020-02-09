import { readFileSync as fsReadFileSync } from 'fs';
import {
  join as pathJoin,
  dirname as pathDirname,
  basename as pathBasename,
  extname as pathExtname,
} from 'path';
import { isFormatSupported } from './supportedFileFormats';

export const readFile = (pathToFile) => {
  try {
    return {
      fileContent: fsReadFileSync(pathToFile, 'utf8'),
      fileContentError: null,
    };
  } catch (error) {
    return {
      fileContent: null,
      fileContentError: `Can't read file '${pathToFile}'`,
    };
  }
};

export const createPath = (pathToFile) => pathJoin(
  pathDirname(pathToFile),
  pathBasename(pathToFile),
);

export const getFileFormat = (filePath) => {
  const fileFormat = pathExtname(filePath).substring(1);
  if (!isFormatSupported(fileFormat)) {
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
