import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';
import json from '../src/formatters/json';

test('good nested json structure with -f json => good results', () => {
  expect(
    JSON.parse(genDiff(
      path.join(__dirname, '__fixtures__/json_12/before.json'),
      path.join(__dirname, '__fixtures__/json_12/after.json'),
      json,
    )),
  ).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_12/result.json'), 'utf8'))
      .result,
  );
});
