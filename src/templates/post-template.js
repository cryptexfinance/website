import React from "react"
// import Container from "react-bootstrap/Container"
import { PageLayout, PageTitle } from "../components"

import SEO from "../utils/seo"

export default ({ title, excerpt, html, subTitle }) => (
  <PageLayout>
    <SEO title={title} description={excerpt} />
    <>
      <PageTitle title={title} />
      {subTitle}
      <>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </>
    </>
  </PageLayout>
)
