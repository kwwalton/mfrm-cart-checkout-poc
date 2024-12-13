import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'


const endpoint = `https://bedhub-dev.azurewebsites.net/graphql`
if (process.env.NODE_ENV === 'development') {
  // Adds messages only in a dev environment
  loadDevMessages()
  loadErrorMessages()
}

export const { getClient: getBedhubClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: endpoint,
      headers: {
        'content-type': 'application/json'
      }
    })
  })
})
