import path from 'path';
import fs from 'fs';
import genDiff from '../src';
import { isValidFormat } from '../src/formatters';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('Check formatters', () => {
  test.each([
    [undefined, true],
    [true, true],
    ['standard', true],
    ['json', true],
    ['plain', true],
    ['my-format', false],
  ])('isValidFormat(%s)', (format, expectedExpression) => {
    expect(isValidFormat(format)).toEqual(expectedExpression);
  });
});

describe('Valid input data => good result', () => {
  test.each([
    ['before.json', 'after.yaml', 'standard', 'result-standard-formatter'],
    ['before.yaml', 'after.ini', 'json', 'result-json-formatter'],
    ['before.ini', 'after.json', 'plain', 'result-plain-formatter'],
  ])('genDiff(%s, %s, %s format output) create expected result', (firstFile, secondFile, outputFormat, expectedExpression) => {
    expect(
      genDiff(getFixturePath(firstFile), getFixturePath(secondFile), outputFormat),
    ).toEqual(readFile(expectedExpression));
  });
});

describe('Invalid input data => error message', () => {
  test.each([
    ['before.json', 'invalid_input.json', 'standard',
      `Can't parse file '${getFixturePath('invalid_input.json')}' as JSON`,
    ],
    ['before.json', 'invalid_extension.txt', 'plain',
      `File '${getFixturePath('invalid_extension.txt')}' has unsupported format`,
    ],
    ['before.json', 'not_exsisting.json', 'plain',
      `Can't read file '${getFixturePath('not_exsisting.json')}'`,
    ],
    ['invalid_input.json', 'after.json', 'standard',
      `Can't parse file '${getFixturePath('invalid_input.json')}' as JSON`,
    ],
    ['invalid_extension.txt', 'after.json', 'plain',
      `File '${getFixturePath('invalid_extension.txt')}' has unsupported format`,
    ],
    ['not_exsisting.json', 'after.json', 'plain',
      `Can't read file '${getFixturePath('not_exsisting.json')}'`,
    ],
  ])('genDiff(%s, %s, %s format output) create expected exception', (firstFile, secondFile, outputFormat, expectedExpression) => {
    expect(
      genDiff(getFixturePath(firstFile), getFixturePath(secondFile), outputFormat),
    ).toEqual(expectedExpression);
  });
});
