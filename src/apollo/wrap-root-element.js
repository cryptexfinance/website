import React from "react"
import { ApolloProvider } from "@apollo/client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { arbitrum } from 'wagmi/chains'

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


/* const { publicClient } = configureChains(
  [arbitrum],
  [
    infuraProvider({ apiKey: "e37c21b7a4e14c74b9719bea11d9d18f" }),
    alchemyProvider({ apiKey: "gKHAv71vj7O1q__-8yW79Ua-4eIXRPAy" }),
    publicProvider()
  ]
) */

export const wagmiConfig = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http("https://arb-mainnet.g.alchemy.com/v2/gKHAv71vj7O1q__-8yW79Ua-4eIXRPAy", {
      batch: true
    }),
  },
})


export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={tanstackQueryClient}>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {({ toString }) => (
              <div className={`theme-${toString()}`}>{element}</div>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>  
  </ApolloProvider>
)
