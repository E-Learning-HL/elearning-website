import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL } from "@/src/const/const";
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        console.error(username, password);
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: username,
            password: password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        if (user?.message) throw new Error(user?.message);

        return user;
      },
    }),
  ],
  session: {
    jwt: true,
    useLocalStorage: true,
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.data.userId,
          access_token: user.data.accessToken,
          name: user.data.userName,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log("token", token);
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          access_token: token.access_token,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
