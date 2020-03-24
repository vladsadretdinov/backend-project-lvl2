import { readFileSync } from 'fs';
import { extname, resolve } from 'path';

export const readFile = (pathToFile) => readFileSync(resolve(pathToFile), 'utf8');

export const getFileFormat = (pathToFile) => extname(pathToFile).substring(1);
