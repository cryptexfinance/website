// import React from "react"
// import ThemeContext, { ThemeProvider } from "./src/utils/theme"
// import "./src/styles/main.scss"

export { wrapRootElement } from "./src/apollo/wrap-root-element";

const addScript = url => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
}

export const onClientEntry = () => {
  window.onload = () => {
    addScript("https://crypto.com/price/static/widget/index.js")
  }
}

/*
export const shouldUpdateScroll = ({
  routerProps: { location },
}) => {
 
  return window.scrollTo(0, 0)
}
*/