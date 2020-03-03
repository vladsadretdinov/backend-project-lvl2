import { has, union } from 'lodash';

const isTypeTypesBothEqualAndObject = (firstType, secondType) => firstType === secondType && firstType === 'object';
const areValuesEqual = (firstValue, secondValue) => firstValue === secondValue;

const getAST = (firstObj, secondObj) => {
  const mergedKeys = union(
    Object.keys(firstObj),
    Object.keys(secondObj),
  );
  const ast = mergedKeys.map((key) => {
    const isFirstObjHasKey = has(firstObj, key);
    const isSecondObjHasKey = has(secondObj, key);

    if (isFirstObjHasKey && isSecondObjHasKey) {
      const firstValue = firstObj[key];
      const secondValue = secondObj[key];
      const firstValueType = typeof firstValue;
      const secondValueType = typeof secondValue;

      if (isTypeTypesBothEqualAndObject(firstValueType, secondValueType)) {
        return {
          key,
          state: 'same',
          value: getAST(firstValue, secondValue),
        };
      }
      if (areValuesEqual(firstValue, secondValue)) {
        return {
          key,
          state: 'same',
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
    return {
      key,
      state: isSecondObjHasKey ? 'added' : 'deleted',
      value: isSecondObjHasKey ? secondObj[key] : firstObj[key],
    };
  });
  return ast;
};

export default getAST;
