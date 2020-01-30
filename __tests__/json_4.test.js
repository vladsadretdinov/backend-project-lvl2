import path from 'path';
import genDiff from '../src/genDiff';

test('dont exist before.json => result contain error message', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_4/before.json'),
      path.join(__dirname, '__fixtures__/json_4/after.json'),
    ),
  ).toEqual(`Can't read file '${path.join(__dirname, '__fixtures__/json_4/before.json')}'`);
});
