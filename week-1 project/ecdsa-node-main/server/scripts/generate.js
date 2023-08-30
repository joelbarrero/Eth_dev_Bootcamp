const { secp256k1: secp } = require('@noble/curves/secp256k1');
const { toHex } = require("ethereum-cryptography/utils");


const privateKey = toHex(secp.utils.randomPrivateKey());
const publicKey = toHex(secp.getPublicKey(privateKey));


console.log("PUBLIC:",publicKey)
console.log("PRIVATE:",privateKey)
