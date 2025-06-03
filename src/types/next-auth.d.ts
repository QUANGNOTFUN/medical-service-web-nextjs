import { DefaultSession } from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user?: {
            accessToken?: string;
        } & DefaultSession['user'];
        role: string;

    }

    interface User {
        accessToken?: string;
        role: string;

    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        role: string;
    }
}