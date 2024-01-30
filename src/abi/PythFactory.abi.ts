export const PythFactoryAbi = [
  {
    inputs: [
      {
        internalType: 'contract AbstractPyth',
        name: 'pyth_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'implementation_',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'validFrom_',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'validTo_',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'UFixed18',
            name: 'multiplierBase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferBase',
            type: 'uint256',
          },
          {
            internalType: 'UFixed18',
            name: 'multiplierCalldata',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferCalldata',
            type: 'uint256',
          },
        ],
        internalType: 'struct IKept.KeepConfig',
        name: 'commitKeepConfig_',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'UFixed18',
            name: 'multiplierBase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferBase',
            type: 'uint256',
          },
          {
            internalType: 'UFixed18',
            name: 'multiplierCalldata',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferCalldata',
            type: 'uint256',
          },
        ],
        internalType: 'struct IKept.KeepConfig',
        name: 'settleKeepConfig_',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'keepCommitIncrementalBufferData_',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'DivisionByZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FactoryNotInstanceError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
    ],
    name: 'InitializableAlreadyInitializedError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InitializableNotInitializingError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InitializableZeroVersionError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryAlreadyAssociatedError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryAlreadyCreatedError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryInvalidGranularityError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryInvalidIdError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryInvalidSettleError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryNotAssociatedError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'KeeperFactoryNotInstanceError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'OwnableNotOwnerError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'OwnableNotPendingOwnerError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'PausableNotPauserError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PausablePausedError',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PythFactoryInvalidIdError',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'int256',
        name: 'value',
        type: 'int256',
      },
    ],
    name: 'UFixed18UnderflowError',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IFactory',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'CallerAuthorized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newGranularity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'effectiveAfter',
        type: 'uint256',
      },
    ],
    name: 'GranularityUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IInstance',
        name: 'instance',
        type: 'address',
      },
    ],
    name: 'InstanceRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'applicableGas',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'applicableValue',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'UFixed18',
        name: 'baseFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'UFixed18',
        name: 'calldataFee',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'UFixed18',
        name: 'keeperFee',
        type: 'uint256',
      },
    ],
    name: 'KeeperCall',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'underlyingId',
        type: 'bytes32',
      },
    ],
    name: 'OracleAssociated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract IOracleProvider',
        name: 'oracle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'OracleCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newPauser',
        type: 'address',
      },
    ],
    name: 'PauserUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newPendingOwner',
        type: 'address',
      },
    ],
    name: 'PendingOwnerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ARB_FIXED_OVERHEAD',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ARB_GAS_MULTIPLIER',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_GRANULARITY',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'acceptOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'underlyingId',
        type: 'bytes32',
      },
    ],
    name: 'associate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'associated',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IFactory',
        name: 'factory',
        type: 'address',
      },
    ],
    name: 'authorize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address',
      },
    ],
    name: 'authorized',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IFactory',
        name: '',
        type: 'address',
      },
    ],
    name: 'callers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'ids',
        type: 'bytes32[]',
      },
      {
        internalType: 'uint256',
        name: 'version',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'commit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numRequested',
        type: 'uint256',
      },
    ],
    name: 'commitKeepConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'UFixed18',
            name: 'multiplierBase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferBase',
            type: 'uint256',
          },
          {
            internalType: 'UFixed18',
            name: 'multiplierCalldata',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferCalldata',
            type: 'uint256',
          },
        ],
        internalType: 'struct IKept.KeepConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'create',
    outputs: [
      {
        internalType: 'contract IKeeperOracle',
        name: 'newOracle',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'current',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ethTokenOracleFeed',
    outputs: [
      {
        internalType: 'contract AggregatorV3Interface',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'fromUnderlyingId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'granularity',
    outputs: [
      {
        components: [
          {
            internalType: 'uint64',
            name: 'latestGranularity',
            type: 'uint64',
          },
          {
            internalType: 'uint64',
            name: 'currentGranularity',
            type: 'uint64',
          },
          {
            internalType: 'uint128',
            name: 'effectiveAfter',
            type: 'uint128',
          },
        ],
        internalType: 'struct IKeeperFactory.Granularity',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IOracleFactory',
        name: 'oracleFactory_',
        type: 'address',
      },
      {
        internalType: 'contract AggregatorV3Interface',
        name: 'chainlinkFeed_',
        type: 'address',
      },
      {
        internalType: 'Token18',
        name: 'dsu_',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IInstance',
        name: 'instance',
        type: 'address',
      },
    ],
    name: 'instances',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'keeperToken',
    outputs: [
      {
        internalType: 'Token18',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oracleFactory',
    outputs: [
      {
        internalType: 'contract IOracleFactory',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'oracles',
    outputs: [
      {
        internalType: 'contract IOracleProvider',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauser',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pyth',
    outputs: [
      {
        internalType: 'contract AbstractPyth',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'ids',
        type: 'bytes32[]',
      },
      {
        internalType: 'contract IMarket[]',
        name: 'markets',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'versions',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'maxCounts',
        type: 'uint256[]',
      },
    ],
    name: 'settle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'settleKeepConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'UFixed18',
            name: 'multiplierBase',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferBase',
            type: 'uint256',
          },
          {
            internalType: 'UFixed18',
            name: 'multiplierCalldata',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'bufferCalldata',
            type: 'uint256',
          },
        ],
        internalType: 'struct IKept.KeepConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'toUnderlyingId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newGranularity',
        type: 'uint256',
      },
    ],
    name: 'updateGranularity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newPauser',
        type: 'address',
      },
    ],
    name: 'updatePauser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newPendingOwner',
        type: 'address',
      },
    ],
    name: 'updatePendingOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'validFrom',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'validTo',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
