const LOW_A_CODE = 'a'.charCodeAt();
const LOW_Z_CODE = 'z'.charCodeAt();
const UPP_A_CODE = 'A'.charCodeAt();
const UPP_Z_CODE = 'Z'.charCodeAt();

const ALPHABET_LEN = LOW_Z_CODE - LOW_A_CODE;

export function encode(message, shift) {
  const result_arr = message.split('').map(letter => {
    if (letter >='a' && letter <= 'z')
      return String.fromCharCode(LOW_A_CODE + (letter.charCodeAt() - LOW_A_CODE + shift) % ALPHABET_LEN);
    else if (letter >='A' && letter <= 'Z')
      return String.fromCharCode(UPP_A_CODE + (letter.charCodeAt() - UPP_A_CODE + shift) % ALPHABET_LEN);
    else
      return letter;
  });
  return result_arr.join('');
}

export function decode(message, shift) {
    const result_arr = message.split('').map(letter => {
    if (letter >='a' && letter <= 'z')
      return String.fromCharCode(LOW_Z_CODE - (LOW_Z_CODE - letter.charCodeAt() + shift) % ALPHABET_LENGTH);
    else if (letter >='A' && letter <= 'Z')
      return String.fromCharCode(UPP_Z_CODE - (UPP_Z_CODE - letter.charCodeAt() + shift) % ALPHABET_LENGTH);
    else
      return letter;
  });
  return result_arr.join('');
}
