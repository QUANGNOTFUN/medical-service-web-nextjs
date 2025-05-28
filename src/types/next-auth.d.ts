import { DefaultSession } from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user?: {
            accessToken?: string;
        } & DefaultSession['user'];
    }

    interface User {
        accessToken?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
    }
}