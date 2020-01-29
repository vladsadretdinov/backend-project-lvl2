import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('good nested ini structure => good results', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/ini_2/before.ini'),
    path.join(__dirname, '__fixtures__/ini_2/after.ini'),
  )).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/ini_2/result.json'), 'utf8')).result,
  );
});
