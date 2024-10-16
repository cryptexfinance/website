import React from "react"
import { Stack } from "react-bootstrap";
import quantstampLogo from "../../../../static/website/security/quantstamp.svg"
import pashovLogo from "../../../../static/website/security/pashov.jpg"
import spearbitLogo from "../../../../static/website/security/spearbit.svg"


const audits = [
  {
    name: "Quantstamp",
    logo: quantstampLogo,
    url: "https://docs.cryptex.finance/audits",
  },
  {
    name: "Spearbit",
    logo: spearbitLogo,
    url: "https://docs.cryptex.finance/audits",
  },
  {
    name: "Pashov",
    logo: pashovLogo,
    url: "https://docs.cryptex.finance/audits",
  },
]

const SectionSecurity = () => { 
  return (
    <Stack
      id="security"
      direction="vertical"
      gap={2}
      className="section-security align-items-center "
    >
      <h1 className="header line-up">
        Trustless experience for all DeFi users.
      </h1>
      <h2 className="headline">
        We integrate battled tested technologies that are secure and trusted by the DeFi community. 
      </h2>
      <h2 className="mt-4 mb-0 headline text-purple">
        Our products are extensively audited by:
      </h2>
      <Stack
        direction="horizontal"
        gap={2}
        className="security-boxes align-self-center justify-content-center"
      >
        {audits.map((audit, index) => (
          <a
            key={index}
            href={audit.url}
            target="_blank"
            rel="noreferrer"
            className="box box-button sec-box align-items-center"
          >
            <img src={audit.logo} alt={audit.name} />
            <h2>{audit.name}</h2>
          </a>
        ))}
      </Stack>
    </Stack>    
  )
}

export default SectionSecurity;