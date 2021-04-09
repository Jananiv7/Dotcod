var CryptoJS = require("crypto-js");

const encrypt = async function (plainText) {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(plainText.toString(), CONFIG.secret_key).toString();//to encrypt the token with another key
    return ciphertext;
}
module.exports.encrypt = encrypt;

const decrypt = function (ciphertext) {
    // decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), CONFIG.secret_key);//to decrypt the encrypted text
    var originalText = bytes.toString(CryptoJS.enc.Utf8);//decrypted text will be as bytes,convert it to string
    console.log('plainText: ', originalText);
    return originalText;
}
module.exports.decrypt = decrypt;