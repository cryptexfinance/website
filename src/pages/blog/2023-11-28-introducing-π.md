---
templateKey: blog-post
title: Introducing Pi
author: Voith
date: 2023-11-29T14:11:09.945Z
description: π is live and it's packed with a lot of features.
featuredpost: true
featuredimage: /img/cryptex_pi_post.jpg
tags:
  - Pi
  - Crytpex
---
###### Here's a break down of what's new:

* The protocol is built on top of low latency on-demand oracles. This means that trades are no longer constrained by the long waiting periods for oracles to update on-chain.
* Trade up to 100x leverage compared to 25x in the previous version.
* Supports multiple order types like limit orders, market, stop loss, tale profit, etc. A keeper needs to execute these orders when the market conditions are met in exchange for a small fee.
* The market contract is now bidirectional i.e the long and short can be done from the same contract.
  The previous version had separate contracts for long and short.
* Takers are first matched with other takers (longs matched with shorts), then with LPs to fill the gap.
  LPs take the opposite side of unmatched trades, which could be long or short exposure.
* The funding rate now uses a PID mechanism that is much better at adjusting to market shocks vs the utilization curve that was used in the previous version.
* Fees are variable based on what impact the order has on the market. This can be used to increase the cost of large buys/sells to defend against market manipulation and add additional incentives for a balanced market.
* Vaults support multiple markets. You can provide liquidity to the vault through a single interface and the vault will then distribute the liquidity to multiple markets.



###### Please note:

π is entirely owned and operated by the Cryptex DAO.
Access to π is restricted for users in certain jurisdictions.
This is not an offer to sell tokens and is not investment advice.



###### **DISCLAIMER: Any views expressed in this post represent the sole analysis of Cryptex, (“Cryptex”) whose opinions are based solely on publicly available information. No representation or warranty, express or implied, is made as to the accuracy or completeness of any information contained herein. Cryptex expressly disclaims any liability based, in whole or in part, on such information, any errors therein, or omissions therefrom. Cryptex also reserves the right to modify or change its views or conclusions at any time in the future without notice. Cryptex is an open-source, fully decentralized protocol. v2 is not available in any restricted jurisdictions. Cryptex is NOT an ICO. No sale has been solicited. The information contained in this post DOES NOT recommend the use of any Cryptex token, nor is it an offer to sell a solicitation, or an offer to buy any Cryptex tokenized asset. Furthermore, CTX token rewards governing the protocol are granted by Cryptex to system providers with a value of ZERO. Always do your own research. The information contained in this post is not intended to be, nor should it be construed or used as, investment advice. No representation, recommendation, or warranty, express or implied, is made as to the future performance or functionality of any Cryptex token. Any unaffiliated use of this document, or the contents herein, is strictly prohibited without the prior written consent of Cryptex.**