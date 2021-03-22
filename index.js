
import _ from 'lodash';
import fs from 'fs';

const getContent = (fullPath) => fs.readFileSync(fullPath, JSON.parse());


const genDiff = (data1, data2) => {
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
};

export default genDiff;
