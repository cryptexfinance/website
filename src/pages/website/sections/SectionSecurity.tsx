import React from "react"
import { Stack } from "react-bootstrap";
import quantstampLogo from "../../../../static/website/security/quantstamp.svg"
import pashovLogo from "../../../../static/website/security/pashov.jpg"
import cantina3Logo from "../../../../static/website/security/cantina3.png"


const audits = [
  {
    name: "Cantina",
    logo: cantina3Logo,
    className: "cantina",
    url: "https://docs.cryptex.finance/assets/files/tcapV2.0-cantina-audit-report-8b521e4a64b470f078f86e763b203de9.pdf",
  },
  {
    name: "Pashov",
    logo: pashovLogo,
    className: "pashov",
    url: "https://docs.cryptex.finance/assets/files/tcapV2.0-pashov-group-audit-report-2d233212e5c3d77879da3c9e1a202632.pdf",
  },
  {
    name: "Quantstamp",
    logo: quantstampLogo,
    className: "quantstamp",
    url: "https://docs.cryptex.finance/audits",
  },
]

const SectionSecurity = () => { 
  return (
    <Stack
      id="security"
      direction="vertical"
      gap={2}
      className="section-security align-items-center"
    >
      <h1 className="header line-up">
        A trustless experience for all DeFi users
      </h1>
      <h2 className="headline">
        We deploy battled tested technologies that are audited and trusted by the DeFi community
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
            <img className={audit.className} src={audit.logo} alt={audit.name} />
            <h2>{audit.name}</h2>
          </a>
        ))}
      </Stack>
    </Stack>    
  )
}

export default SectionSecurity;
