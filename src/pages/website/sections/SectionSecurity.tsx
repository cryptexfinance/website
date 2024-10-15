import React from "react"
import { Stack } from "react-bootstrap";
import quantstampLogo from "../../../../static/website/security/quantstamp.svg"
import pashovLogo from "../../../../static/website/security/pashov.jpg"
import spearbitLogo from "../../../../static/website/security/spearbit.svg"


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
      <h2 className="mt-4 mb-0 text-purple">
        Our products are extensively audited by:
      </h2>
      <Stack direction="vertical">
        <Stack
          direction="horizontal"
          gap={2}
          className="security-boxes align-self-center justify-content-center"
        >
          <Stack direction="vertical" gap={2} className="box sec-box align-items-center">
            <img src={quantstampLogo} alt="Quantstamp" height={160} width={160} />
            <h2>Quantstamp</h2>
          </Stack>
          <Stack direction="vertical" gap={2} className="box sec-box align-items-center">
            <img src={spearbitLogo} alt="Quantstamp" height={160} width={160} />
            <h2>Spearbit</h2>
          </Stack>
          <Stack direction="vertical" gap={2} className="box sec-box align-items-center">
            <img
              src={pashovLogo}
              alt="Pashov"
              height={160}
              width={160}
              style={{ borderRadius: "50%" }}
            />
            <h2>Pashov</h2>
          </Stack>
        </Stack>
      </Stack>  
    </Stack>    
  )
}

export default SectionSecurity;
