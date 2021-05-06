import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parse from './parser.js';
import makeObjectsDiff from './makeObjectsDiff.js';

const getObj = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const dataFormat = path.extname(absolutePath).slice(1);
  const data = fs.readFileSync(absolutePath);
  return parse(data, dataFormat);
};
const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = makeObjectsDiff(getObj(filepath1), getObj(filepath2));
  return format(diff, formatName);
};
export default genDiff;
