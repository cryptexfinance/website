export const SetTokenAbi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getComponents",
    outputs: [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;