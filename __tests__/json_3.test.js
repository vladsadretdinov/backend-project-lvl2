import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('empty after.json => result contain only before.json elements', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/json_3/before.json'),
    path.join(__dirname, '__fixtures__/json_3/after.json'),
  )).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_3/result.json'), 'utf8')).result,
  );
});
