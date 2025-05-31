import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const httpLink = new HttpLink({
	uri: "http://localhost:3002/graphql",
	credentials: "include",
});

// const authLink = setContext((_, {headers}) => {
// 	// get the authentication token from local storage if it exists
// 	const token = localStorage.getItem("token");
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : "",
// 		},
// 	};
// });
//
const errorLink = onError(({graphQLErrors, networkError}) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({message, locations, path}) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	}
	if (networkError) console.log(`[Network error]: ${networkError}`);
})

export const apolloClient = new ApolloClient({
	link: errorLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
		},
		query: {
			fetchPolicy: "cache-only",
		}
	}
});