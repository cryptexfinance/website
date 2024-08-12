import React from "react"


export const Highlight = ({ children } : { children: React.ReactElement | string | any }) => { 
  return (
    <p className="no-margin" style={{ fontSize: "1.1rem" }}>
      {children}
    </p>
  )
}

export const PurpleText = ({ children } : { children: React.ReactElement | string }) => {
  return (
    <span className="text-purple" style={{ fontSize: "1.1rem" }}>
      {children}
    </span>
  )
}