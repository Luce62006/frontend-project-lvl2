import yaml from 'js-yaml';

// Выбираем и запускаем парсер
const makeParsing = { json: JSON.parse, yaml: yaml.load, yml: yaml.load };

export default (data, dataFormat) => makeParsing[dataFormat](data);
