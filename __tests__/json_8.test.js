import path from 'path';
import genDiff from '../src/genDiff';

test('dont exist after.json => result contain error message', () => {
  expect(
    genDiff(
      path.join(__dirname, '__fixtures__/json_8/before.txt'),
      path.join(__dirname, '__fixtures__/json_8/after.json'),
    ),
  ).toEqual(
    `File '${path.join(__dirname, '__fixtures__/json_8/before.txt')}' has unsupported format`,
  );
});
