import path from 'path';
import genDiff from '../src/genDiff';

test('dont exist after.json => result contain error message', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_5/before.json'),
      path.join(__dirname, '__fixtures__/json_5/after.json'),
    ),
  ).toEqual(`Can't read file '${path.join(__dirname, '__fixtures__/json_5/after.json')}'`);
});
