import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Valid input data => good result', () => {
  test.each([
    ['before.json', 'after.yaml', 'pretty', 'result-pretty-formatter'],
    ['before.yaml', 'after.ini', 'json', 'result-json-formatter'],
    ['before.ini', 'after.json', 'plain', 'result-plain-formatter'],
  ])('genDiff(%s, %s, %s format output) create expected result', (firstFilePath, secondFilePath, outputFormat, expectedExpression) => {
    expect(
      genDiff(getFixturePath(firstFilePath), getFixturePath(secondFilePath), outputFormat),
    ).toEqual(readFile(expectedExpression));
  });
});

describe('Invalid input data => error message', () => {
  test.each([
    ['before.json', 'invalid_input.json', 'pretty'],
    ['before.json', 'invalid_extension.txt', 'plain'],
    ['before.json', 'not_exsisting.json', 'plain'],
    ['invalid_input.json', 'after.json', 'pretty'],
    ['invalid_extension.txt', 'after.json', 'plain'],
    ['not_exsisting.json', 'after.json', 'plain'],
  ])('genDiff(%s, %s, %s format output) create exception', (firstFilePath, secondFilePath, outputFormat) => {
    expect(() => {
      genDiff(getFixturePath(firstFilePath), getFixturePath(secondFilePath), outputFormat);
    }).toThrow();
  });
});
