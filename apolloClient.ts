// apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Remplacez par l'URL de votre API GraphQL
  cache: new InMemoryCache(),
});

export default client;
