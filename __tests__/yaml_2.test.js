import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff';

test('good nested yaml structure => good results', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/yaml_2/before.yaml'),
    path.join(__dirname, '__fixtures__/yaml_2/after.yaml'),
  )).toEqual(
    JSON.parse(fs.readFileSync(path.join(__dirname, '__fixtures__/yaml_2/result.json'), 'utf8')).result,
  );
});
