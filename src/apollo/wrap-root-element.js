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

const ALCHEMY_KEY = process.env.GATSBY_ALCHEMY_KEY || process.env.ALCHEMY_KEY
const INFURA_ID = process.env.GATSBY_INFURA_ID || process.env.INFURA_ID
export const wagmiConfig = createConfig({
  chains: [arbitrum],
  transports: {
    [arbitrum.id]: http(`https://arbitrum-mainnet.infura.io/v3/${INFURA_ID}`),
    /* [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`, {
      batch: true
    }), */
  },
  batch: { multicall: true },
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
