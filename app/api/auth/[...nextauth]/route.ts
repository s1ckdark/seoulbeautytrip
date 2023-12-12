import NextAuth, { AuthOptions } from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        NaverProvider({
            clientId: process.env.NCP_LOGIN_CLIENT_ID || "",
            clientSecret: process.env.NCP_LOGIN_SECRET || ""
        }),
    ],
    pages: {
        signIn: '/login', // on successfully signin    
        signOut: '/login', // on signout redirects users to a custom login page.
        // error: '/error',  // displays authentication errors
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
        session: ({ session, token }: { session: Session; token: JWT }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };