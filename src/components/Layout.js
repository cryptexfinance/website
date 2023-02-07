import React from "react"
// import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({ children }) => {
  // const { title, description } = useSiteMetadata()
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default TemplateWrapper
