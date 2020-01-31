/* eslint-disable no-param-reassign */

export default (_ast) => {
  const renderHelper = (value) => {
    if (typeof value === 'object') {
      return '[complex value]';
    } if (typeof value === 'string') {
      return `'${value}'`;
    }
    return `${value}`;
  };

  const render = (ast, parent) => ast.reduce((acc, element) => {
    const value = renderHelper(element.value);
    const beforeValue = renderHelper(element.beforeValue);

    switch (element.state) {
      case 'changed':
        acc += `Property '${parent}${element.key}' was changed from ${beforeValue} to ${value}`;
        acc += '\n';
        break;
      case 'deleted':
        acc += `Property '${parent}${element.key}' was deleted`;
        acc += '\n';
        break;
      case 'added':
        acc += `Property '${parent}${element.key}' was added with value: ${value}`;
        acc += '\n';
        break;
      default:
        acc += `Property '${parent}${element.key}' was remained`;
        acc += '\n';
        if (typeof element.value === 'object') {
          acc += render(element.value, `${parent}${element.key}.`);
        }
        break;
    }
    return acc;
  }, '');

  return `${render(_ast, '').slice(0, -1)}`;
};
