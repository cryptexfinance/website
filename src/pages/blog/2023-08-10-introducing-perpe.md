---
templateKey: blog-post
title: Introducing PERPE.
author: Joe
date: 2023-08-11T03:37:51.497Z
description: "Cryptex V2: 20x PEPE Perpetual Market, now Live on Arbitrum."
featuredpost: true
featuredimage: /img/perpe_cu.png
tags:
  - Cryptex V2
  - PERPE
---
## 20x PEPE Perpetual Market.

## Cryptex V2.

## Now Live on Arbitrum.

![Perpe - Cryptex V2](/img/perpe_cu.png)

**PERPE** is a PEPE Perpetual Market with up to 20x leverage.

**PERPE** is the second Perpetual Market to launch on **Cryptex V2**, following the launch of TOTAL CRYPTO MARKET CAP (TCAP) Perpetual on June 6, 2023.

**PERPE** Maker/Taker Fees paid to Protocol: **ZERO**.

**PERPE Liquidity:** Can be provisioned equally, or split between Maker/
Taker via Cryptex V2 Pro Interface.

**PERPE Leverage:** Up to 20x.

**PERPE** is settled with Chainlink PEPE/USD oracle on Arbitrum.

<https://arbiscan.io/address/0x02DEd5a7EDDA750E3Eb240b54437a54d57b74dBE#code>

**Cryptex** is the first protocol to deploy Chainlink PEPE/USD price feed on Arbitrum.

**PEPE/USD Oracle Latency:** 0.5% 

**PERPE Slippage:** ZERO 

**Additional Parameters**:

**1. PERPE Maintenance: 5%**

This is the minimum amount of collateral that needs to be maintained with respect to the notional value.

With this value, we calculate the maximum leverage = 1/0.05 = 20

**2. PERPE Funding Fee: 0%**

This is the percentage of the Funding Fee that can be claimed by the protocol.

**This is currently set to 0 so that Makers can claim the entire funding amount.**

**3. PERPE Maker Fee: 0%**

This is the fee charged as a percentage of the Maker notional amount.

This is currently set to 0 to incentivize Makers while bootstrapping this market.

**4. PERPE Taker Fee: 0.15%**

This is the fee charged as a percentage of the Taker notional amount and is currently paid entirely to the Makers.

**5. PERPE Position Fee: 0%**

This is the percentage of the Maker/Taker fees that can be kept by the protocol. A value of 1 indicates that all the fees will be distributed to the protocol and 0 if all the fees are to be distributed to Makers/Takers. **It is currently set to 0, distributing all Taker fees to Makers during the bootstrapping period.**

**6. PERPE Maker Limit: 60 Trillion PEPE**

This is the maximum amount of Maker notional amount that a market can have. This value is approximately 3 million USD in collateral.



**Please note:**

* **Access to V2 is restricted for users in certain jurisdictions.**
* **Cryptex has no access to user funds. Use the system at your own risk.**
* **This communication is not an offer to sell tokens and is not financial or investment advice**.