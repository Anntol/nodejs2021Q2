import { Transform } from 'stream';
import { shiftMessage } from './caesar.js';

class TransformerStream extends Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = +shift;
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString();
    const shiftedMessage = shiftMessage(source, (this.action === 'encode') ? this.shift : -this.shift);
    this.push(shiftedMessage);
    callback();
  }
}

export default TransformerStream;