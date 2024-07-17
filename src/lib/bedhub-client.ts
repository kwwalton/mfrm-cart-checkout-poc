import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

const endpoint = `https://bedhub-dev.azurewebsites.net/graphql`;

export const { getClient: getBedhubClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: endpoint,
      headers: {
        "content-type": "application/json",
      },
    }),
  });
});
