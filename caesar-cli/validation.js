import * as path from 'path';
import { accessSync } from 'fs';

export function areOptionsValid(action, shift) {  
    if (action === undefined) {
      console.error('"action" is a required option');
      return false;
    }
    
    if (action !== 'encode' && action !== 'decode') {
      console.error('"action" must be "encode" or "decode"');
      return false;
    }
  
    if (shift === undefined) {
      console.error('"shift" is a required option');
      return false;
    }
  
    if (!Number.isInteger(+shift)) {
      console.error('"shift" must be an integer number');
      return false;
    }
  
    return true;
}

export function isFileAccessible(filePath) {
  if (filePath) {
    try {
      if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(filePath);
      }
      accessSync(filePath);
    } 
    catch (error) {
      console.error(`No access to file ${filePath}`);
      return false;
    }
  }
  return true;
}