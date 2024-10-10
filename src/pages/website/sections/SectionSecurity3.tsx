import React from "react"
import { Stack } from "react-bootstrap";
// import { BsCheckCircle } from "react-icons/bs";
import spearbitLogo from "../../../../static/website/protocol/spearbit.svg"
import quantstampLogo from "../../../../static/website/protocol/quantstamp.svg"
import quantstampLogo2 from "../../../../static/website/protocol/quantstamp2.svg"


const SectionSecurity3 = () => { 
  return (
    <Stack direction="vertical" className="section-security">
      <h1 className="px-3">
        Secure, trustless experience for all DeFi users.
      </h1>
      <Stack direction="horizontal" gap={2}>
        <Stack direction="vertical" className="box w-50 justify-content-space-between" style={{ height: "25rem" }}>
          <div>
            <span style={{ fontSize: "1.1rem" }}>
              Cryptex Finance is extensively audited before any markets are launched live for public use. We’ve hired Quantstamp,
              Spearbit/Cantina and Pashov to audit the smart contracts built for staking and indexing. For other markets,
              we have integrated battled tested technologies that are secure and trusted by the DeFi community.
            </span>
          </div>
          <Stack direction="horizontal" gap={2} className="justify-content-space-around" >
            <div>
              <img src={quantstampLogo} height={80} width={80} />
            </div>
            <div
              style={{
                height: "90%",
                borderLeft: "1px solid #494866",
              }}
            />
            <div>
              <img src={spearbitLogo} height={80} width={80} />
            </div>
            <div
              style={{
                height: "90%",
                borderLeft: "1px solid #494866",
              }}
            />
            <div>
              <img src={quantstampLogo2} height={80} width={80} />
            </div>  
          </Stack>
        </Stack>
        <Stack className="w-50" style={{ marginTop: "1.2rem" }} />
      </Stack>
    </Stack>  
  )
}

export default SectionSecurity3;
