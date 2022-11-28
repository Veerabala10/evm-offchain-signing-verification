pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "hardhat/console.sol";

contract VerifySignature {
    struct SignatureData {
        address signer;
        bytes32 s;
        bytes32 r;
        uint8 v;
    }

    struct Message {
        string name;
        uint256 amount;
    }

    bytes32 private constant DOMAIN_HASH =
        keccak256("EIP712Domain(uint256 chainId,address verifyingContract)");
    bytes32 private constant STRUCT_HASH =
        keccak256("Message(string name,uint256 amount)");

    function _hash(Message memory message) internal returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    keccak256(
                        abi.encode(
                            DOMAIN_HASH,
                            1,
                            0xf8e81D47203A594245E36C48e151709F0C19fBe8
                        )
                    ),
                    keccak256(
                        abi.encode(
                            STRUCT_HASH,
                            keccak256(bytes(message.name)),
                            message.amount
                        )
                    )
                )
            );
    }

    function verify(
        address signer,
        bytes32 r,
        bytes32 s,
        uint8 v,
        Message memory message
    ) external returns (bool) {
        console.log(signer ==
            ecrecover(
                _hash(message),
                v,
                r,
                s
            ));
        return
            signer ==
            ecrecover(
                _hash(message),
                v,
                r,
                s
            );
    }
}


//["0x0cbFDc7a44E2618141Afa9A3D55A783cf0f07B4d",0x0cbFDc7a44E2618141Afa9A3D55A783cf0f07B4d,0x346ce9c5af160eecbc3371b2c5e29dc4a659153012002d7908ef4d87c2951d68,27]