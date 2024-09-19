import React from "react"
import leoChen from '../../static/website/social/leoChen.jpg'
import dnkta from '../../static/website/social/dnkta.jpg'
import defiWarhol from '../../static/website/social/defi_warhol.jpg'
import sherifDefi from '../../static/website/social/sherifDefi.png'
import theEliteCrypto from '../../static/website/social/theEliteCrypto.jpg'
import cyrilxbt from '../../static/website/social/cyrilxbt.jpg'


export type PostType = {
  name: string;
  username: string;
  bio: string;
  image: string;
  link: string;
  post: React.ReactElement | string;
}

const cryptexXLink = "https://x.com/CryptexFinance"

const CryptexXComponent = () => (
  <>
    {" "}
    <a className="text-purple text-decoration-none" href={cryptexXLink} target="_blank" rel="noreferrer">@CryptexFinance</a>
    {" "}
  </>
)

const PicXLink = ({ name, url } : { name: string, url: string }) => (
  <>
    {" "}
    <a className="text-purple text-decoration-none" href={url} target="_blank" rel="noreferrer">{name}</a>
    {" "}
  </>
)

const ShowMoreLink = ({ url }: { url: string }) => (
  <>
    {" "}
    <a className="text-purple text-decoration-none" href={url} target="_blank" rel="noreferrer">Show more</a>
    {" "}
  </>
)

export const Posts: Array<PostType> = [
  {
    name: "Elite Crypto",
    username: "@TheEliteCrypto",
    bio: "Lorem ipsum, or lipsum.",
    image: theEliteCrypto,
    link: "https://x.com/theelitecrypto/status/1835989593918750799",
    post: (
      <p>
        <p>
          Just discovered <CryptexXComponent /> – the DeFi Super dApp that's changing the game! It offers instant token swaps, easy cross-chain transfers,
          decentralized trading options and curated crypto bundles, all into one seamless platform.
        </p>
        <p>
          Why Cryptex?  
          <br />
          ➜ All-in-One Solution: Everything in one place, no more juggling platforms...
          <ShowMoreLink url="https://x.com/SherifDefi/status/1835989593918750799" />
        </p>
      </p>
    )
  },
  {
    name: "Defi Warhol",
    username: "@Defi_Warhol",
    bio: "Lorem ipsum, or lipsum.",
    image: defiWarhol,
    link: "https://x.com/defi_warhol/status/1834223428183679090",
    post: (
      <p>
        <p>
          DeFi's main issue towards mass adoption? Interoperability issues and complex UX.
        </p>
        <p>
          <CryptexXComponent /> has cracked the code, merging a complete DeFi service suite into one seamless platform.
        </p>
        <p>
          Stop scrolling for 5 minutes and maximize your DeFi experience forever 🧵
          <PicXLink name="pic.x.com/kmpzaiu1af" url="https://x.com/Defi_Warhol/status/1834223428183679090/photo/1" />
        </p>
      </p>
    )
  },
  {
    name: "dnkta.eth",
    username: "@dnkta",
    bio: "Lorem ipsum, or lipsum.",
    image: dnkta,
    link: "https://x.com/dnkta/status/1832042160260047029",
    post:
      <p>
        Future of Finance <CryptexXComponent /> 👀
        <br />
        <PicXLink name="pic.x.com/ii0imdonzy" url="https://x.com/dnkta/status/1832042160260047029/photo/1" />
      </p>
  },
  {
    name: "leo ꧁IP꧂",
    username: "@leo_hao",
    bio: "Lorem ipsum, or lipsum.",
    image: leoChen,
    link: "https://x.com/leo_hao/status/1826674373887230021",
    post:
      <p>
        <p>
        don't underestimate the OG and builders!
        <CryptexXComponent />
        team kept building for a long time since 2021.
        </p>
        <p>
          Congrats! Very Cool!
        </p>  
      </p>
  },
  {
    name: "Sherif | DeFi",
    username: "@SherifDefi",
    bio: "Lorem ipsum, or lipsum.",
    image: sherifDefi,
    link: "https://x.com/sherifdefi/status/1834534034463965397",
    post: (
      <p>
        <p>
          ▪️ Say goodbye to the complexity of navigating multiple DeFi platforms!
        </p>
        <p>
          <CryptexXComponent />
          is evolving into a DeFi Super App, consolidating all your trading needs in one place. 
        </p>
        <p>
          ☂️ No more switching between platforms to access different services – Cryptex is sim... 
          <ShowMoreLink url="https://x.com/SherifDefi/status/1834534034463965397" />
        </p>
      </p>
    )
  },
  {
    name: "Cyril - DeFi",
    username: "@cyrilXBT",
    bio: "Lorem ipsum, or lipsum.",
    image: cyrilxbt,
    link: "https://x.com/cyrilxbt/status/1834612839039803703",
    post: (
      <p>
        <p>
          Imagine not needing to navigate multiple platforms! 
        </p>
        <p>
          <CryptexXComponent /> got the solution for: 
        </p>
        <p>
          Trade spot markets with deep liquidity
          Access perpetual futures for leverage
          Issue curated crypto indexes for diversification
          Use smart vaults for automated strategies
          
        </p>
        <p>
          All in one seamless...
          <ShowMoreLink url="https://x.com/SherifDefi/status/1834612839039803703" />
        </p>
      </p>
    )
  },
]
