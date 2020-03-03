import { readFileSync } from 'fs';
import {
  join, dirname, basename, extname,
} from 'path';

export const readFile = (pathToFile) => readFileSync(pathToFile, 'utf8');

export const createFullFilePath = (pathToFile) => join(
  dirname(pathToFile),
  basename(pathToFile),
);

export const getFileFormat = (filePath) => extname(filePath).substring(1);
