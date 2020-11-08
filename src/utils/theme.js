import React, { Component } from "react"

const defaultState = {
  dark: false,
  toString: () => `light`,
  toggleDark: () => {},
}

const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends Component {

  render() {
    const { children } = this.props
    return (
      <>
        {children}
      </>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
