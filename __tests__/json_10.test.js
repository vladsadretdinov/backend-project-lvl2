import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('good nested json structure => good results', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_10/before.json'),
      path.join(__dirname, '__fixtures__/json_10/after.json'),
    ),
  ).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_10/result.json'), 'utf8'))
      .result,
  );
});
