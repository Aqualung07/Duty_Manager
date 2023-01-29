import { ApolloClient, InMemoryCache } from "@apollo/client";

const service_config = (() => {
  const isDev = true;
  const port = 3000;

  const uri = isDev
    ? `http://localhost:${port}/graphql`
    : "https://pablosilva.me/duties";

  const client = new ApolloClient({
    uri: `${uri}`,
    cache: new InMemoryCache(),
  });

  return { getClient };

  function getClient() {
    return client;
  }
})();

export default service_config;
