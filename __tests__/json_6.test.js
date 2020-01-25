import path from 'path';
import genDiff from '../src/genDiff';

test('dont exist after.json => result contain error message', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/json_6/before.json'),
    path.join(__dirname, '__fixtures__/json_6/after.json'),
  )).toEqual(
    `Can't parse file '${path.join(__dirname, '__fixtures__/json_6/before.json')}'`,
  );
});
