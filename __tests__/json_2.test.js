import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('empty before.json => result contain only after.json elements', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_2/before.json'),
      path.join(__dirname, '__fixtures__/json_2/after.json'),
    ),
  ).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_2/result.json'), 'utf8'))
      .result,
  );
});
