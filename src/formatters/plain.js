import _ from 'lodash';

// Вспомогательная функция для обработки значений
const valueFormatter = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : `${value}`;
};

const formatter = (data) => {
  const innerFormatter = (innerData, path = []) => {
    const formattedData = innerData.map((node) => {
      const pathElements = [...path, node.name];
      const actualPath = pathElements.join('.');
      switch (node.type) {
        case 'ADDED':
          return `Property '${actualPath}' was added with value: ${valueFormatter(node.value)}`;
        case 'REMOVED':
          return `Property '${actualPath}' was removed`;
        case 'CHANGED':
          return `Property '${actualPath}' was updated. From ${valueFormatter(node.oldValue)} to ${valueFormatter(node.newValue)}`;
        case 'PARENT':
          return `${innerFormatter(node.children, pathElements)}`;
        case 'UNCHANGED':
          return null;
        default:
          throw new Error(`"${node.type}" type is not supported by the formatter`);
      }
    })
      .filter((elem) => elem !== null);

    return `${formattedData.join('\n')}`;
  };

  return innerFormatter(data);
};

export default formatter;
