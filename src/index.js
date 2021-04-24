import fs from 'fs';
import path from 'path';
import format from './formatters/index.js';
import parser from './parser.js';
import makeObjectsDiff from './makeObjectsDiff.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  // Выясняем формат файлов
  const dataFormat1 = path.extname(absolutePath1).slice(1);
  const dataFormat2 = path.extname(absolutePath2).slice(1);

  // Читаем файлы
  const data1 = fs.readFileSync(absolutePath1);
  const data2 = fs.readFileSync(absolutePath2);

  // Парсим файлы в JS-объекты
  const obj1 = parser(data1, dataFormat1);
  const obj2 = parser(data2, dataFormat2);

  // Формируем diff-файл
  const diff = makeObjectsDiff(obj1, obj2);

  return format(diff, formatName);
};
export default genDiff;
