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
