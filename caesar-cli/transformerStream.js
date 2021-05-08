import { Transform } from 'stream';
import { encode, decode } from './caesar.js';

class TransformerStream extends Transform {
  constructor(action, shift) {
    super();
    this.action = action;
    this.shift = +shift;
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString();
    const destination = (this.action === 'encode' && this.shift > 0 || 
      this.action === 'decode' && this.shift < 0) ?
      encode(source, Math.abs(this.shift)) : 
      decode(source, Math.abs(this.shift));
    this.push(destination);
    callback();
  }
}

export default TransformerStream;