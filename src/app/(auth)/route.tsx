import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_API_URL,
    cache: new InMemoryCache(),
})

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const mutation = gql`
                    mutation Login($email:String!, $password:String!) {
                        login(userData:{
                            email:$email
                            password:$password
                        }){
                            user{
                                username
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
                            email: credentials?.email,
                            password: credentials?.password
                        }
                    })
                    console.log("data=> ", data)
                    if (data?.login) {
                        return {
                            name: data?.login.user.username,
                            email: data?.login.user.email,
                            accessToken: data?.login.accessToken
                        } as User
                    }
                    return null;
                } catch (error) {
                    console.log("err=> ", error)
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
                token.name = user.name;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    accessToken: token.accessToken
                }
            }

            return session;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };