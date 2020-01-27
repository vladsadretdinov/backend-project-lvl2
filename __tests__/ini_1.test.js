import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('good ini files => good results', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/ini_1/before.ini'),
    path.join(__dirname, '__fixtures__/ini_1/after.ini'),
  )).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/ini_1/result.json'), 'utf8')).result,
  );
});
