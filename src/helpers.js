import { readFileSync as fsReadFileSync } from 'fs';
import {
  join as pathJoin,
  dirname as pathDirname,
  basename as pathBasename,
  extname as pathExtname,
} from 'path';

export const readFile = (pathToFile) => fsReadFileSync(pathToFile, 'utf8');

export const createFullFilePath = (pathToFile) => pathJoin(
  pathDirname(pathToFile),
  pathBasename(pathToFile),
);

export const getFileFormat = (filePath) => pathExtname(filePath).substring(1);
