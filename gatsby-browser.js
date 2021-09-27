// import React from "react"
// import ThemeContext, { ThemeProvider } from "./src/utils/theme"
// import "./src/styles/main.scss"

export { wrapRootElement } from './src/apollo/wrap-root-element';

export const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps,  
  getSavedScrollPosition  
}) => {
  if (typeof prevRouterProps !== "undefined") {
    const path = prevRouterProps.location.pathname;
    const re = /(\/blog\/)\w/;
    if (re.test(path) && routerProps.location.pathname === "/") {
      return window.scrollTo(getSavedScrollPosition(routerProps.location));
    }  
  }  
    
  return window.scrollTo(0, 0)
}