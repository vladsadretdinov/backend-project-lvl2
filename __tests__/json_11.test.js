import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';
import plain from '../src/formatters/plain';

test('good nested json structure => good results', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_11/before.json'),
      path.join(__dirname, '__fixtures__/json_11/after.json'),
      plain,
    ),
  ).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_11/result.json'), 'utf8'))
      .result,
  );
});
