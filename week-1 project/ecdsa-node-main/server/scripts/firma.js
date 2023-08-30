const { secp256k1: secp } = require('@noble/curves/secp256k1');
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const elliptic = require('elliptic');



function signMessage(message,privateKey){

    msg=hashMessage(message);
    const sig=secp.sign(msg,privateKey)
    const result = {
        recovery: sig.recovery,
        compactHex: sig.toCompactHex(),
      }

    return result
}

function hashMessage(message){
    return keccak256(utf8ToBytes(JSON.stringify(message)));
}

function getPublicKeyFromSignature (signature, message, recovery) {
    const sig = secp.Signature.fromCompact(signature).addRecoveryBit(recovery);
    const bytes = sig.recoverPublicKey(hashMessage(message)).toRawBytes();
    const hex = toHex(bytes);
    return {
      sig,
      bytes,
      hex,
    }
  }


  //const privateKey=secp.utils.randomPrivateKey();
  //const publicKey=secp.getPublicKey(privateKey);
  //const message={sender:"0x123",recipient:"0x456",amount:100};
  //const signature=signMessage(message,privateKey);
 // const PK=getPublicKeyFromSignature(signature.compactHex,message,signature.recovery);
  
 //console.log(PK.hex)
 //console.log(toHex(publicKey))


module.exports = {signMessage,getPublicKeyFromSignature,hashMessage}

