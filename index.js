/* eslint-disable no-restricted-syntax */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

// получаем путь
function getContent(fullPath) {
  return fs.readFileSync(fullPath, 'utf8');
}
// преобразуем путь в обьект
const data = JSON.parse(getContent);
// передаем обьект в функцию
function genDiff(data1, data2) {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = unionKeys.sort();
  const result = [];
  for (const key of sortedKeys) {
    if (!_.has(data1, key)) {
      result.push([`+ ${key}: ${data2[key]}`]);
    } else if (!_.has(data2, key)) {
      result.push([`- ${key}: ${data1[key]}`]);
    } else if (data1[key] !== data2[key]) {
      result.push([`- ${key}: ${data1[key]}`]);
      result.push([`+ ${key}: ${data2[key]}`]);
    } else {
      result.push([`  ${key}: ${data1[key]}`]);
    }
  }
  return result.join('\n');
}

export default genDiff;
