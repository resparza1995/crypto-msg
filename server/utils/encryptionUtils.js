const crypto = require("crypto");

const algorithm = "aes-256-ctr";

function encrypt(text, secret) {
    console.log(text, secret)
    var cipher = crypto.createCipher(algorithm, secret);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
}

function decrypt(text, secret) {
    var decipher = crypto.createDecipher(algorithm, secret);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
}
/*
let x = encrypt("hola", "1234")
let y = decrypt("4b7fcce13ba2bb6f3d04a98d319cfb", "1111")
console.log(y)
*/
module.exports = {
    encrypt,
    decrypt,
};
