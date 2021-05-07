import { Command } from 'commander/esm.mjs';
const program = new Command();
program
  .option('-a --action <action>', 'action')
  .option('-s --shift <shift>', 'shift')
  .option('-i --input <file>', 'input file')
  .option('-o --output <file>', 'output file')
  .parse(process.argv);

  const { action, shift, input, output } = program.opts();
  console.log('a: ', action);
  console.log('s: ', shift);
  console.log('i: ', input);
  console.log('o: ', output);