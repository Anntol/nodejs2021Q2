import { Command } from 'commander/esm.mjs';
import { pipeline } from 'stream';
import TransformerStream from './transformerStream.js';

const program = new Command();
program
  .option('-a --action <action>', 'action')
  .option('-s --shift <shift>', 'shift')
  .option('-i --input <file>', 'input file')
  .option('-o --output <file>', 'output file')
  .parse(process.argv);

const { action, shift, input, output } = program.opts();
if (!areOptionsValid(action, shift)){  
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

function areOptionsValid(action, shift) {  
  if (action === undefined) {
    console.error('"action" is required option');
    return false;
  }
  
  if (action !== 'encode' && action !== 'decode') {
    console.error('"action" must be "encode" or "decode"');
    return false;
  }

  if (shift === undefined) {
    console.error('"shift" is required option');
    return false;
  }

  if (!Number.isInteger(+shift)) {
    console.error('"shift" must be an integer number');
    return false;
  }

  return true;
}