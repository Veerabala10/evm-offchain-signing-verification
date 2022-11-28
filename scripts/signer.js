import Web3 from 'web3';
const web3 = new Web3()
import {
    recoverTypedSignature,
    signTypedData,
    TypedDataUtils,
    typedSignatureHash,
    SignTypedDataVersion,
    TYPED_MESSAGE_SCHEMA,
} from '@metamask/eth-sig-util'

const typedData = {
    types: {
        EIP712Domain: [
            {
                name: 'chainId',
                type: 'uint256',
            },
            {
                name: 'verifyingContract',
                type: 'address',
            }
        ],
        Message: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ]
    },
    primaryType: 'Message',
    domain: {
        chainId: 1,
        verifyingContract: '0xf8e81D47203A594245E36C48e151709F0C19fBe8'
    },
    message: {
        name: 'Test',
        amount: 1
    }
}

const privateKey = Buffer.from(
    '3799ec53e162ad5bfe097ee41cd18a58686e9bac5e6b9de2afa2f06cc12cda64',
    'hex',
);

let signature = signTypedData(
    {
        privateKey,
        data: typedData,
        version: "V4"
    }
)

console.log(signature)

signature = signature.substring(2, signature.length)

const r = "0x" + signature.substring(0,64)
const s = "0x" + signature.substring(64,128)
const v = parseInt(signature.substring(128,130), 16)

console.log(r)
console.log(s)
console.log(v)

// 0x0cbFDc7a44E2618141Afa9A3D55A783cf0f07B4d
// 0x3799ec53e162ad5bfe097ee41cd18a58686e9bac5e6b9de2afa2f06cc12cda64

// 346ce9c5af160eecbc3371b2c5e29dc4a659153012002d7908ef4d87c2951d687fabee8f1c556e506fec0382a0d5bf09a436f44bb91dcd09c9f2fe4efe640bfd1b