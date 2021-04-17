import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file2.json');
const result = readFile('result.txt');
test('genDiff', () => {
  expect(genDiff(file1Path, file2Path)).toEqual(result);
});
