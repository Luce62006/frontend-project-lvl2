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

  // YAML and YML
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'stylish', resultStylish],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'plain', resultPlain],
  ['__fixtures__/1.yaml', '__fixtures__/2.yml', 'json', resultJson],

  // CROSSED
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'stylish', resultStylish],
  ['__fixtures__/1.yaml', '__fixtures__/2.json', 'plain', resultPlain],
  ['__fixtures__/1.json', '__fixtures__/2.yml', 'json', resultJson],
]);

test('genDiff stylish and plain', (filepath1, filepath2, formatName, resultFile) => {
  expect(genDiff(filepath1, filepath2, formatName))
    .toEqual(resultFile);
});

test('genDiff JSON', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json');
  expect(() => JSON.parse(result)).not.toThrow();
});
