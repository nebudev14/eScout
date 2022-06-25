import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            
        })
    ],
    jwt: {
        encryption: true,
    },
    secret: process.env.secret,
    callbacks: {
        async jwt(token, account) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            return token;
        },

    }
})