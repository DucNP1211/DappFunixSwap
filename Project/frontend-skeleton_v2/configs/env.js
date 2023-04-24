const EnvConfig = {
    RPC_ENDPOINT: 'https://localhost:9545',
    TOKEN_ABI: [{
            "inputs": [{
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowed",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "name": "balances",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "internalType": "string",
                "name": "",
                "type": "string"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "tokenOwner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [{
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    /* DONE: You should change these configurations with your deployed exchange contract instead */
    EXCHANGE_CONTRACT_ABI: [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "stateMutability": "payable",
            "type": "receive",
            "payable": true
        },
        {
            "inputs": [],
            "name": "checkEthBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "getListOfSupportedTokens",
            "outputs": [{
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "destToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "getExchangeRate",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "destTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "srcAmount",
                    "type": "uint256"
                }
            ],
            "name": "exchange",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "destTokenAddress",
                "type": "address"
            }],
            "name": "exchangeEthToToken",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [{
                    "internalType": "address",
                    "name": "srcTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "exchangeTokenToEth",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "contract Reserve",
                "name": "newReserve",
                "type": "address"
            }],
            "name": "addReserve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }],
            "name": "buyToken",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
        },
        {
            "inputs": [{
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            }],
            "name": "removeReserve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    EXCHANGE_CONTRACT_ADDRESS: '0x19B86dde0011715964F6f9523fF298E260c8dE11',
    /* END DONE */

    TOKENS: [{
            "name": 'Ether',
            "symbol": 'ETH',
            address: '0x0000000000000000000000000000000000000000',
        },
        /* DONE: Change to your own deployed tokens. Remember to put 2 tokens here to support token to token swapping */
        {
            "name": 'SWA 1',
            "symbol": 'SWA1',
            address: '0x20976e28eDA720CCb889a78405Bb7751E97b473D',
        },
        {
            "name": 'SWA 2',
            "symbol": 'SWA2',
            address: '0x5a5c6A4FC57F078a350a027b759290b2e856880c',
        },
        /* END DONE */

    ],

};

export default EnvConfig;