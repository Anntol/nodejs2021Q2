import * as fs from 'fs';
import { Command } from 'commander/esm.mjs';
import { pipeline } from 'stream';

import TransformerStream from './transformerStream.js';
import { areOptionsValid, isFileAccessible } from './validation.js'

const program = new Command();
program
  .option('-a --action <action>', 'action')
  .option('-s --shift <shift>', 'shift')
  .option('-i --input <file>', 'input file')
  .option('-o --output <file>', 'output file')
  .parse(process.argv);

const { action, shift, input, output } = program.opts();
if (!areOptionsValid(action, shift) ||
  (!isFileAccessible(input)) || (!isFileAccessible(output))) {
    process.exit(1);
}

pipeline(
  input ? fs.createReadStream(input) : process.stdin,
  new TransformerStream(action, shift),
  output ? fs.createWriteStream(output, { flags: 'a' }) : process.stdout,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
      process.exit(1);
    }
  }
)
