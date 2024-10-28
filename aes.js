
/*
 * Este código utiliza o algoritmo AES (Advanced Encryption Standard) com chave de 128 bits e o modo de operação CBC (Cipher Block Chaining).
 * AES é amplamente utilizado em segurança da informação para criptografar dados sensíveis com alta eficiência e segurança.
 * No modo CBC, cada bloco de texto claro é XOR com o bloco de texto cifrado anterior, aumentando a segurança contra ataques de repetição.
 * Neste exemplo, a biblioteca `crypto` do Node.js é usada para criptografar e descriptografar uma mensagem com uma chave e um vetor de inicialização (IV) aleatórios.
 * O código oferece uma implementação prática de AES-128-CBC para cifrar e decifrar textos.
 */


const crypto = require('crypto');

// função para criptografar o texto com AES-128-CBC
function encryptAES(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// função para descriptografar o texto com AES-128-CBC
function decryptAES(encryptedText, key, iv) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// utilizando
const key = crypto.randomBytes(16);
const iv = crypto.randomBytes(16);  

const text = "O texto deve";
console.log("Texto original:", text);

// para criptografar
const encryptedText = encryptAES(text, key, iv);
console.log("Texto criptografado:", encryptedText);

// para descriptografar
const decryptedText = decryptAES(encryptedText, key, iv);
console.log("Texto descriptografado:", decryptedText);