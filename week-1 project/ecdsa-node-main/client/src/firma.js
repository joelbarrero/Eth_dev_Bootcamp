
import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

function hashMessage(message) {
  return keccak256(utf8ToBytes(JSON.stringify(message)))
}

export function signMessage(msg,privateKey) {
    const message=hashMessage(msg);
    const sig=secp.sign(message,privateKey)
    const result = {
        recovery: sig.recovery,
        compactHex: sig.toCompactHex(),
      }

    return result
}

export function getPublicKey(privateKey) {
  return toHex(secp.getPublicKey(privateKey))
}