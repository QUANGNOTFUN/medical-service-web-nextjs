// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql', // Đổi theo API của bạn
    credentials: 'include',
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
