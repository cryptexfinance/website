import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://education.cryptex.finance/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
})
