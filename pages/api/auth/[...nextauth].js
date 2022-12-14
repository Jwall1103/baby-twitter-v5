import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    //configure one or more auth providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        //add more providers here. wanted to add email auth but didn't have time
    ],
    callbacks: {
        async session({session, token}) {
            session.user.tag = session.user.name.split(" ").join("").
            toLocaleLowerCase();

            session.user.uid = token.sub;
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_SECRET
});