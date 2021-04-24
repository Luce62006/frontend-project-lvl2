#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action(
    (filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2, program.format));
    },
  )
  .parse(process.argv);
