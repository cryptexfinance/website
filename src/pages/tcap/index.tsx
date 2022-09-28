import React from "react";
import SectionTcap from "./SectionTcap";
import { PageLayout } from "../../components";
import { Seo } from "../../utils";

const Tcap = () => (
  <PageLayout>
    <Seo title="Cryptex TCAP index" />
    <SectionTcap />
  </PageLayout>
);

export default Tcap;
