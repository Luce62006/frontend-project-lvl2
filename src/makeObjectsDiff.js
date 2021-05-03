import _ from 'lodash';

// Функция высчитывает разницу между двумя объектами
const makeObjectsDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const result = _.sortBy(_.union(keys1, keys2)).map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key, type: 'ADDED', value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key, type: 'REMOVED', value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        name: key, type: 'PARENT', children: makeObjectsDiff(obj1[key], obj2[key]),
      };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key, type: 'CHANGED', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return {
      name: key, type: 'UNCHANGED', value: obj1[key],
    };
  });
  return result;
};

export default makeObjectsDiff;
