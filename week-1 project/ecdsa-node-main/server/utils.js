const { secp256k1: secp } = require('@noble/curves/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

function getPublicKeyFromSignature (signature, message, recovery) {
  const sig = secp.Signature.fromCompact(signature).addRecoveryBit(recovery);
  const bytes = sig.recoverPublicKey(hashMessage(message)).toRawBytes();
  const hex = toHex(bytes);
  return {
    bytes,
    hex,
  }
}

function getAddress(publicKey) {
  return toHex(keccak256(publicKey.slice(1)).slice(-20));
}

module.exports = {
  getPublicKeyFromSignature,
  getAddress,
}