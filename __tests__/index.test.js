import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

// Получаем URL этого модуля и преобразуем его в путь
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('result-stylish.txt');
const resultPlain = readFile('result-plain.txt');
const resultJson = readFile('result-json.txt');

test.each([
  // JSON
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish', resultStylish],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'plain', resultPlain],
  ['__fixtures__/file1.json', '__fixtures__/file2.json', 'json', resultJson],

])('genDiff', (filepath1, filepath2, formatName, resultFile) => {
  expect(genDiff(filepath1, filepath2, formatName))
    .toBe(resultFile);
});
