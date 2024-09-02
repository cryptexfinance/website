import React from "react"


export const Highlight = ({ children } : { children: React.ReactElement | string | any }) => { 
  return (
    <p className="no-margin highlight" style={{ fontSize: "1.1rem" }}>
      {children}
    </p>
  )
}

export const PurpleText = ({ children } : { children: React.ReactElement | string }) => {
  return (
    <span className="text-purple">
      {children}
    </span>
  )
}