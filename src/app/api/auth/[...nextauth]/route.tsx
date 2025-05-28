import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL,
    cache: new InMemoryCache(),
});

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials,req) {
                if (!credentials?.email || !credentials?.password) return null;

                const mutation = gql`
                    mutation Login($email: String!, $password: String!) {
                        login(userData: {
                            email: $email,
                            password: $password
                        }) {
                            user {
                                email
                            }
                            accessToken
                            refreshToken
                        }
                    }
                `;

                try {
                    const { data } = await client.mutate({
                        mutation,
                        variables: {
                            email: credentials.email,
                            password: credentials.password
                        }
                    });

                    if (data?.login?.accessToken) {
                        return {
                            email: data.login.user.email,
                            accessToken: data.login.accessToken,
                        } as any;
                    }
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                email: token.email,
                accessToken: token.accessToken,
            };
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
