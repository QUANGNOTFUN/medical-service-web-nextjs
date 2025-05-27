// src/lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql', // Đổi theo API của bạn
    credentials: 'include',
});
const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
