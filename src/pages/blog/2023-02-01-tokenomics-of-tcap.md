---
templateKey: blog-post
title: Tokenomics Of $TCAP
author: Voith
date: 2023-02-01T17:22:56.878Z
description: "Check here to read about the the tokenomics of $TCAP, the Total
  Crypto Market Cap Token. "
featuredpost: false
featuredimage: /img/tcap_placeholder.png
tags:
  - TCAP
---
[$TCAP](https://cryptex.finance/) is an [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token that tokenizes the Total Market Capitalization of all cryptocurrencies in real-time. It’s a synthetic asset that tracks the total market capitalization through an oracle.

Like any other Defi protocol, it has a well thought out tokenomics to make it work. Its [whitepaper](https://cryptex.finance/White_Paper.pdf) does a good job of describing the mechanism but doesn’t detail the formulae’s mathematical derivation. In this article, I will try to explain the mathematical thought that went behind its design. But before I dive deep into the maths, I want to explain some key concepts that drive its mechanism.

## TCAPs Mechanism

![](https://miro.medium.com/max/700/1*Bg_fugzM8cBDFyoeaLgq4g.png)

Tcap protocol mechanism

The flowchart above best describes the workings of the TCAP protocol. Below is a description of the protocol mechanism. I have tried to explain the mechanism by introducing some fundamental concepts of the protocol.

1. **Collateralization:** SinceTCAP is a synthetic asset, it has no inherent value if all it does is track the market cap’s price and thus no inherent guarantee that it will trade at the quoted price. Hence, TCAP is backed by collateral to maintain its price. TCAP can use any collateral that has value and conforms to an [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) interface
2. **Vaults:** A vault is a [smart contract](https://ethereum.org/en/developers/docs/smart-contracts/) that allows users to deposit their collateral.
3. **Vault Ratio:** TCAP needs to be backed by at least 100% collateral value. However, the price of most ERC20 tokens is volatile. Therefore, TCAP needs to be over collateralized for the protocol to be resilient to such price movements. The ratio between the value of the collateral deposited and the value of TCAP borrowed is called the vault ratio. It is also known as the collateralization ratio.
4. **Debt:** The protocol can be considered a collateral loan whereby the borrower borrows TCAP against the deposited collateral. The system, therefore, treats the borrowed amount of TCAP as debt.
5. **Minting:** When a user borrows TCAP against deposited collateral, the system creates new TCAP tokens by increasing its supply. This process of creating new tokens is called minting. Please note that TCAP can only be minted in proportion to the backed collateral and the minimum vault ratio set by the system needs to be maintained.
6. **Burning:** A user can reduce their debt by destroying some of the minted TCAP. This process of reducing the supply of TCAP tokens is called burning.
7. **Liquidation:** As the price of the collateral and TCAP varies over time, the vault ratio can fall below the minimum vault ratio. This means that the debt of the vault now exceeds the value of the collateral locked. The protocol in such a case reduces its liability by incentivizing other users to pay the debt of the under collateralized vault in return for a reward. The system, in this case, burns the TCAP tokens of the user paying the debt and reduces the debt of the undercollateralized vault. This process of paying the debt of a vault and reducing the total supply of TCAP is called liquidating a vault. Please note that the debt of the vault liquidation user remains unchanged, although they burn their TCAP tokens to pay the debt of another vault.
8. **Liquidation reward:** The system incentivizes users to pay the debt of under collateralized vaults in exchange for a portion of the deposited collateral. This reward is called a liquidation reward.
9. **Liquidation Penalty:** Vaults that are under collateralized are punished by making them pay a fee during liquidation. This fee is controlled by a parameter called the liquidation penalty. I will explain this parameter in more detail in the next section.
10. **Burn Fee:** The system charges a protocol maintenance fee whenever a vault is liquidated or burnt TCAP. The parameter that controls this fee is called the burn fee.

## TCAP Tokenomics

![](https://miro.medium.com/max/700/1*n-ggncw20Z6pg-z7JQFv1A.png)

## **Example**

Let's try to understand how the system works with an example.

The ETH Vault has a minimum vault ratio of 150%, a liquidation penalty of 20% and a burn fee of 1%. Assume that the price of ETH is $2000 USD and the price of TCAP is $130 USD. If we want to mint 20 TCAP then the amount of ETH required would be:

![](https://miro.medium.com/max/700/1*bD0fZ8aGZOqbxZnXvjVI-A.png)

So in order to mint 20 TCAP, you’d first need to deposit 2.025 ETH.

Now let's assume that the price of TCAP increases by 15% and the price of ETH remains the same.

![](https://miro.medium.com/max/700/1*uT5zdcqjKTjz6HJOA6tpbA.png)

The new vault ratio, in this case, would be:

![](https://miro.medium.com/max/700/1*8VLtEv6j4XydvBHR12pXPg.png)

Since the vault ratio is less than 130 %, the vault is now susceptible to liquidation. The amount of TCAP required to liquidate the vault is:

![](https://miro.medium.com/max/700/1*lghd2y4uD3nFCuNVujUumA.png)

The liquidation reward will be:

![](https://miro.medium.com/max/700/1*FbV1e5ynutJGRz9Z5MC6qA.png)

The burn fee will be:

![](https://miro.medium.com/max/700/1*wTSpB1XDBB6T0uNFqr-kRA.png)

The profit after liquidating the vault will be:

![](https://miro.medium.com/max/700/1*rXUVYyXUvqH0NR5klbOMzg.png)

## **Conclusion**

We worked through the theory behind TCAP’s workings and walked through an example for more clarity.\
I hope this article helped you understand the tokenomics of TCAP.