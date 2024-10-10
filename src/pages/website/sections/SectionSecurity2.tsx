import React from "react"
import { Stack } from "react-bootstrap";
// import { BsCheckCircle } from "react-icons/bs";
import cantinaLogo from "../../../../static/website/protocol/cantina.svg"
import spearbitLogo from "../../../../static/website/protocol/spearbit.svg"
import quantstampLogo2 from "../../../../static/website/protocol/quantstamp2.svg"


const SectionSecurity2 = () => { 
  return (
    <Stack direction="vertical" className="section-security">
      <h1 className="px-3">
        Secure, trustless experience for all DeFi users.
      </h1>
      <Stack direction="horizontal" gap={2}>
        <Stack className="box w-50">
          <span style={{ fontSize: "1.1rem" }}>
            Cryptex Finance is extensively audited before any markets are launched live for public use. We’ve hired Quantstamp,
            Spearbit/Cantina and Pashov to audit the smart contracts built for staking and indexing. For other markets,
            we have integrated battled tested technologies that are secure and trusted by the DeFi community.
          </span>  
        </Stack>
        <Stack className="w-50" style={{ marginTop: "1.2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "1.2rem",
            }}
          >
            <div className="box justify-content-center" style={{ height: "9.25rem", margin: "0rem" }}>
              <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
                <img src={quantstampLogo2} alt="Quantstamp" height={38} width={38} />
                <h1 style={{ margin: "0rem" }}>Quantstamp</h1>
              </Stack>
            </div>
            <div className="box justify-content-center" style={{ height: "9.25rem", margin: "0rem" }}>
              <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
                <img src={spearbitLogo} alt="Quantstamp" height={38} width={38} />
                <h1 style={{ margin: "0rem" }}>Spearbit</h1>
              </Stack>
            </div>
            <div className="box justify-content-center" style={{ height: "9.25rem", margin: "0rem"  }}>
              <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
                <img src={spearbitLogo} alt="Quantstamp" height={38} width={38} />
                <h1 style={{ margin: "0rem" }}>Spearbit</h1>
              </Stack>
            </div>
            <div className="box justify-content-center" style={{ height: "9.25rem", margin: "0rem"  }}>
              <Stack direction="horizontal" gap={2} className="align-items-center justify-content-center">
                <img src={quantstampLogo2} alt="Quantstamp" height={38} width={38} />
                <h1 style={{ margin: "0rem" }}>Quantstamp</h1>
              </Stack>
            </div>
          </div>
        </Stack>
      </Stack>
    </Stack>  
  )
}

export default SectionSecurity2;
