#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../index.js';

const program = new commander.Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<pathToFile1> <pathToFile2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (pathToFile1, pathToFile2) => {
      console.log(genDiff(pathToFile1, pathToFile2, program.format));
    },
  )
  .parse(process.argv);
