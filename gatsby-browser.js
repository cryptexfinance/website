import "@fontsource/alegreya-sans"
import "@fontsource/fjalla-one"
import "@fontsource/hind-siliguri"
import "@fontsource/signika-negative"


import "@fontsource/aclonica"
import "@fontsource/dangrek"
import "@fontsource/genos"
import "@fontsource/port-lligat-sans"
import "@fontsource/source-sans-3"
import "@fontsource/yanone-kaffeesatz"


export { wrapRootElement } from "./src/apollo/wrap-root-element"

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
