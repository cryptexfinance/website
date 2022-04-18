---
templateKey: blog-post
title: "Space Invaders Alpha Leaks: Episode 13 with Kelvin Fichter from Optimism"
author: Jacob
date: 2022-04-18T17:56:22.015Z
description: Cryptex featured Kelvin Fichter, a developer at Optimism, as our
  guest for the 13th episode of Space Invaders.
featuredpost: true
featuredimage: /img/space-invaders-alpha-leaks-episode-13-with-kelvin-fichter-from-optimism.png
tags:
  - CTX
  - Cryptex Finance
  - Optimism
  - Jacob
---
![Space Invaders Alpha Leaks: Episode 13 with Kelvin Fichter from Optimism](/img/space-invaders-alpha-leaks-episode-13-with-kelvin-fichter-from-optimism.png "Space Invaders Alpha Leaks: Episode 13 with Kelvin Fichter from Optimism")

Cryptex (CTX) the protocol and community behind Total Crypto Market Cap token (TCAP), is constantly inspired and impressed by the creators and builders of web3. Cryptex created Space Invaders to help people get an inside look into the minds of the most important web3 creators and builders of our time.

On April 5th Cryptex welcomed Aspen the new host of Space Invaders, as our host for future episodes. Cryptex featured Kelvin Fichter as our guest for the 13th episode of Space Invaders. Kelvin Fichter is a developer at Optimism which is responsible for cheap transactions on the Ethereum network. Typically these episodes are recorded live on Twitter Spaces and then published on YouTube and a variety of podcast platforms.

In this post, we are sharing the most thought-provoking and alpha-infused pieces of the conversation. These are things most people would not get a chance to find out unless they were listening to the conversation at air time, which you can find on our Youtube channel and podcast formats.

Read on for the alpha leaks from Space Invaders Episode 13 with Kelvin Fichter from Optimism.

**Aspen:** Do you mind explaining to people who may not know, what is Optimism?

**Kelvin:** That's a great question. I think there are a lot of different ways to think about what Layer 2 is. My favorite version of this is basically, knowing a Layer 2 is all about using Ethereum more efficiently. Ethereum is kind of inefficient in the way that it works right now. And there are a lot of reasons for that. I think the biggest thing that people have learned over time is that there's no need to have one global state for everybody. And the reason for that is because there are a lot of times when other people don't really need to know what's going on in your little personal bubble. Let’s say if you can create these little bubbles of, sort of financial activity, you can start to make things really, really efficient.

So anyway, Optimism is one of these projects. So it's essentially taking advantage, using Ethereum more efficiently, and publishing transaction data to Ethereum, but doing all of the execution outside of Ethereum and then publishing transaction results back to Ethereum. So in Ethereum, you have three main components, you have transaction data, you have execution, and then you have the results of those transactions. So we keep the transaction data on Ethereum and we keep the results on Ethereum, but the actual execution is really, really expensive on Ethereum and it's expensive because you have thousands and thousands of machines that have to do this execution every time you wanna do a transaction. So we shift it out and we do it on different networks of nodes. But at the end of the day, it makes transactions much cheaper. And the goal, of course, is to do this without significantly changing the security properties of Ethereum. So you want that Ethereum level of security, but you want much cheaper transactions. So that's what we try to do.

**Aspen**: So your team created the whole technology behind Optimistic Rollups?

**Kelvin:** Well, there's a bit of a debate about, you know, who came up with Optimistic Rollups. I think the real answer to this is there was a certain point in time, probably near the end of 2018, the beginning of 2019, where the conditions were right for many people to stumble upon this idea of optimistic rollups at the same time. We were one of the groups of people, that happened to stumble upon this other people had stumbled upon it before, and maybe they hadn't explained it well enough. But actually, Rick Dudley, years ago before anyone was thinking about Optimistic Rollups. Rick Dudley, would have conversations but never fully knew how to explain his ideas, and looking back, he was trying to explain Optimistic Rollups, he didn't realize how to formalize it and put it down. So, we were definitely one of the groups of people working on this. Definitely, one of the early groups to start putting it into production.

**Aspen:** So what projects are currently compatible with Optimism?

**Kelvin**: So, in a couple of ways, we're actually more compatible with Ethereum than any other Layer 2 right now, besides the people who have forked our codebase, which I think is a good idea, the Optimism codebase is a great codebase to fork, but basically any app that you can deploy on Ethereum right now, you can deploy on Optimism and not only are all the opt codes identical, but you know, you're just running guests.

So a lot of tooling just works out of the box that doesn't really, work out of the box for other systems, and all the gas costs are the same. The solidity compiler does some weird things around gas costs, where it expects certain operations to costs X amount of gas. And if that's not the case, you can have things that work on Ethereum, that don't work on your L2. So basically at this point, literally anything you can do on Ethereum it'll pretty much work 1:1 on Optimism; very exciting.

**Aspen**: Well, that funnels into my other question, what are the main things that set Optimism apart from different Layer 2 solutions? I know you touched on that a bit, but are there any other big pointers that stand out?

**Kelvin**: I'll start with the more visible stuff. The more visible stuff is, out of all of the Layer 2s right now, it's probably the most compatible with Ethereum. So, as a user, you might not notice this sort of thing, but as a developer, you don't have to worry about gas. You don't have to worry about all these little tiny discrepancies that can create headaches, right. It's just everything that works on Ethereum just works on Optimism. No question, no big caveats that you have to learn about. So that's one thing but, from a user standpoint, Optimism invests very, very heavily in infrastructure. And our systems team is absolutely stacked to be quite honest.

Essentially Optimism is designed not to go down, and when things happen, it's designed to react very quickly and we work very carefully to make sure that the system stays up. In the single sequencer world that we're in right now, that's great, because it means you don't have to worry about the sequencer going down. And then the final thing I'll say from a technical standpoint is, we are working on an exciting new, release of Optimism called Bedrock, which people may have heard about it. We haven't done any official announcements, but it's not like it's a secret.

Bedrock is exciting because it's essentially cutting our Geth down way further than it already. The difference between our version of Geth and upstream Geth is like 300 lines of code, which is insane. The main advantage that this has is that we can stay really, really close to upstream Geth, and as Optimism gets more and more mature, you know, we're essentially gonna have 15 to 20 engineers who are just working on this node who can then turn around and just work on improving Layer 1. And we're starting to see this shift already. We're starting to dedicate more and more time, to stuff like **EIP-4844** to really just make Layer 1 better for everybody.

And I think this is like kind of a point of pride within Optimism is to try to, scale Ethereum, we're not trying to create a separate scaling solution. And everything that we try to keep as close to Ethereum as possible. Let's work with the Layer 1 development process, as much as we can, and not just make Optimism cheaper, but make everybody's Layer 2’s cheaper and really just make it possible for more people to use Ethereum.

**To catch the full episode, go to:**

**Kelvin’s Twitter**: [](https://twitter.com/kelvinfichter)<https://twitter.com/kelvinfichter>

**Learn more about Cryptex & TCAP:**

**Website:** [](https://cryptex.finance/)<https://cryptex.finance/>

**Twitter:** [](https://twitter.com/cryptexfinance)<https://twitter.com/cryptexfinance>

DISCLAIMER: Any views expressed in this post represent the sole analysis of Cryptex, (“Cryptex”) whose opinions are based solely on publicly available information. No representation or warranty, express or implied, is made as to the accuracy or completeness of any information contained herein. Cryptex expressly disclaims any and all liability based, in whole or in part, on such information, any errors therein, or omissions therefrom. Cryptex also reserves the right to modify or change its views or conclusions at any time in the future without notice. Cryptex is an open-source, fully decentralized protocol. Cryptex is NOT an ICO. No sale has been solicited. The information contained in this post DOES NOT recommend the use of any Cryptex token, nor is it an offer to sell, a solicitation, or an offer to buy any Cryptex tokenized asset. Furthermore, CTX token rewards governing the protocol are granted by Cryptex to system providers with a value of ZERO. Always do your own research. The information contained in this post is not intended to be, nor should it be construed or used as, investment advice. No representation, recommendation, or warranty, express or implied, is made as to the future performance or functionality of any Cryptex token. Any unaffiliated use of this document, or the contents herein, is strictly prohibited without the prior written consent of Cryptex.