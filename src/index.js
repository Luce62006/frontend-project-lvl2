import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import makeObjectsDiff from './makeObjectsDiff.js';

// получаем абсолютный путь
const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  console.log(absolutePath1);

  // Выясняем формат файлов
  const dataFormat1 = path.extname(absolutePath1).slice(1);
  const dataFormat2 = path.extname(absolutePath2).slice(1);
  console.log(dataFormat1);

  // Читаем файлы
  const data1 = fs.readFileSync(absolutePath1);
  const data2 = fs.readFileSync(absolutePath2);
  console.log(data1);

  // Парсим файлы в JS-объекты
  const obj1 = parser(data1, dataFormat1);
  const obj2 = parser(data2, dataFormat2);
  console.log(obj1);

  // Формируем diff-файл
  const diff = makeObjectsDiff(obj1, obj2);

  // Выбираем и запускаем форматер
  return diff;
};
export default genDiff;
