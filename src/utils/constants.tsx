import vaultAbi from "../contracts/vaultAbi.json"


export const WETH_ADRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const TCAP_ADDRESS = "0x16c52CeeCE2ed57dAd87319D91B5e3637d50aFa4";
export const TCAP_WETH_POOL_URL =
    `https://app.uniswap.org/#/add/${WETH_ADRESS}/${TCAP_ADDRESS}/3000?chain=mainnet`;
export const FOUNDERS_ADDRESS = "0x7059928231d115bb47d46fdfd5e574c5e4fe38c0"
export const LIQUIDITY_REWARD_ADDRESS = "0xc8bb1cd417d20116387a5e0603e195ca4f3cf59a"
export const LIQUIDITY_REWARD2_ADDRESS = "0xdc4cdd5db9ee777efd891690dc283638cb3a5f94"
export const MULTISIG_ADDRESS = "0xa70b638b70154edfcbb8dbbbd04900f328f32c35"
export const TREASURY_ADDRESS = "0xa54074b2cc0e96a43048d4a68472f7f046ac0da8"

export const TOKENS_SYMBOL = {
  arb: "arb",
  eth: "eth",
  pepe: "pepe",
  tcap: "tcap",
}

export const VAULTS = {
  arbAddress: "0x1960628db367281B1a186dD5B80B5dd6978F016F",
  ethAddress: "0x5A572B5fBBC43387B5eF8de2C4728A4108ef24a6",
  pepeAddress: "0xB84b9D427Fb30eD3641afAc2e07B8C471bb0C6Ee",
  tcapAddress: "0xEa281a4c70Ee2ef5ce3ED70436C81C0863A3a75a",
  abi: vaultAbi,
}

