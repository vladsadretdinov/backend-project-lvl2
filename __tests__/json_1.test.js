import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('good json files => good results', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/json_1/before.json'),
    path.join(__dirname, '__fixtures__/json_1/after.json'),
  )).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/json_1/result.json'), 'utf8')).result,
  );
});
