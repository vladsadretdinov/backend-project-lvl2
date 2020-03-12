import {
  has, union, keys, isObject, isEqual,
} from 'lodash';

const getAST = (firstObj, secondObj) => {
  const mergedKeys = union(keys(firstObj), keys(secondObj));

  const ast = mergedKeys.map((key) => {
    const isFirstObjHasKey = has(firstObj, key);
    const isSecondObjHasKey = has(secondObj, key);

    if (isFirstObjHasKey && isSecondObjHasKey) {
      const firstValue = firstObj[key];
      const secondValue = secondObj[key];

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
    }

    if (isSecondObjHasKey) {
      return {
        key,
        state: 'added',
        value: secondObj[key],
      };
    }

    return {
      key,
      state: 'deleted',
      value: firstObj[key],
    };
  });

  return ast;
};

export default getAST;
