import {
  has, union, keys, isObject, isEqual,
} from 'lodash';

const getAST = (firstObj, secondObj) => {
  const mergedKeys = union(keys(firstObj), keys(secondObj));

  return mergedKeys.map((key) => {
    const firstValue = firstObj[key];
    const secondValue = secondObj[key];

    if (!has(secondObj, key)) {
      return {
        key,
        state: 'deleted',
        value: firstObj[key],
      };
    }

    if (!has(firstObj, key)) {
      return {
        key,
        state: 'added',
        value: secondObj[key],
      };
    }

    if (isObject(firstValue) && isObject(secondValue)) {
      return {
        key,
        state: 'nested',
        children: getAST(firstValue, secondValue),
      };
    }

    if (isEqual(firstValue, secondValue)) {
      return {
        key,
        state: 'remained',
        value: firstValue,
      };
    }

    return {
      key,
      state: 'changed',
      beforeValue: firstValue,
      afterValue: secondValue,
    };
  });
};

export default getAST;
