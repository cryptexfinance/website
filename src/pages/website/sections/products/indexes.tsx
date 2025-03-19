import React, { useState } from "react"
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { Button, Stack, Tabs, Tab } from "react-bootstrap"
import { useTranslation } from "gatsby-plugin-react-i18next"

import TcapV2 from "./tcapv2";
import Arfi from "./arfi";

enum IndexesTabs {
  tcap = "tcap",
  arfi = "arfi",
}

const Indexes = () => {
  const { t } = useTranslation()
  const breakpoints = useBreakpoint();
  const [currentTab, setCurrentTab] = useState<IndexesTabs>(IndexesTabs.tcap)
  const mobileHeight = currentTab === IndexesTabs.tcap ? "620px" : "460px"
  const onTabChange = (key: string | null) => {
    setCurrentTab(key as IndexesTabs)
  }

  return (
    <Stack
      className="indexes"
      style={{
        flex: "unset",
        height: !breakpoints.sm ? "30rem" : mobileHeight,
      }}>
      {/* <Tabs
        id="order-types-tabs"
        defaultActiveKey={IndexesTabs.tcap}
        onSelect={(k) => onTabChange(k)}
      >
        <Tab eventKey={IndexesTabs.tcap} title="TCAP V2" />
        <Tab eventKey={IndexesTabs.arfi} title="ARFI" />
      </Tabs> */}
      <Stack direction="horizontal" gap={2} className={`px-4 ${breakpoints.sm ? "mt-4" : ""}`}>
        <Button
          onClick={() => setCurrentTab(IndexesTabs.tcap)}
          className="btn-index"
          style={{
            height: !breakpoints.sm ? "3.1rem" : "33px",
            width: !breakpoints.sm ? "11rem" : "50%",
            fontSize: !breakpoints.sm ? "1.3rem" : "16px",
            backgroundColor: "transparent",
            borderColor: currentTab === IndexesTabs.tcap ? "#A440F2" : "#494866",
          }}
        >
          TCAP V2
        </Button>
        <Button
          className="btn-index"
          onClick={() => setCurrentTab(IndexesTabs.arfi)}
          style={{
            height: !breakpoints.sm ? "3.1rem" : "33px",
            width: !breakpoints.sm ? "11rem" : "50%",
            fontSize: !breakpoints.sm ? "1.3rem" : "16px",
            backgroundColor: "transparent",
            borderColor: currentTab === IndexesTabs.arfi ? "#A440F2" : "#494866",
          }}
        >
          ARFI
        </Button>
      </Stack>
      {currentTab === IndexesTabs.tcap && (
        <TcapV2 />
      )}
      {currentTab === IndexesTabs.arfi && (
        <Arfi />
      )}
    </Stack>    
  )
}

export default Indexes;
