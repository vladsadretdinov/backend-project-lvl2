import path from 'path';
import genDiff from '../src/genDiff';

test('dont exist after.json => result contain error message', () => {
  expect(genDiff(
    path.join(__dirname, '__fixtures__/json_9/before.json'),
    path.join(__dirname, '__fixtures__/json_9/after.txt'),
  )).toEqual(
    `File '${path.join(__dirname, '__fixtures__/json_9/after.txt')}' has unsupported format`,
  );
});
