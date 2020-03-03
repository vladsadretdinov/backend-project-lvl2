/* eslint-disable no-param-reassign */

import { has, reduce } from 'lodash';

const getAST = (firstObj, secondObj) => {
  const mergedObj = {
    ...firstObj,
    ...secondObj,
  };
  const result = reduce(
    mergedObj,
    (acc, value, key) => {
      if (has(firstObj, key) && has(secondObj, key)) {
        if (typeof value === typeof firstObj[key] && typeof value === 'object') {
          acc.push({
            key,
            state: 'same',
            value: getAST(firstObj[key], value),
          });
          return acc;
        }
        if (typeof value !== 'object' && typeof firstObj[key] !== 'object') {
          if (value === firstObj[key]) {
            acc.push({
              key,
              state: 'same',
              value,
            });
            return acc;
          }
        }
        acc.push({
          key,
          state: 'changed',
          beforeValue: firstObj[key],
          afterValue: value,
        });
        return acc;
      }
      if (has(secondObj, key)) {
        acc.push({
          key,
          state: 'added',
          value,
        });
        return acc;
      }
      acc.push({
        key,
        state: 'deleted',
        value,
      });
      return acc;
    },
    [],
  );
  return result;
};

export default getAST;
