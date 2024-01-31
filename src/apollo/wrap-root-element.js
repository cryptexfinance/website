import React from "react"
import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeContext, { ThemeProvider } from "../utils/theme"
import { client } from "./client"
import "../styles/main.scss"

const Hour = 60n * 60n

const tanstackQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(1n * Hour) * 1000, // 1 hour in ms
    },
  },
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={tanstackQueryClient}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ toString }) => (
            <div className={`theme-${toString()}`}>{element}</div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </QueryClientProvider>  
  </ApolloProvider>
)
