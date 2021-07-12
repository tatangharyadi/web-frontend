import { axiosAPI } from "@/config/axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { redirect } from "next/dist/next-server/server/api-utils";

export default NextAuth({
  providers: [
    Providers.Credentials({
      id: "domain",
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "email@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const { data } = await axiosAPI.post("auth/login", {
          email: username,
          password,
        });

        if (data) {
          return { email: data.user, accessToken: data.access_token };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {
      return url === process.env.NODE_ENV ? "http://localhost:8080" : url;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user?.accessToken) {
        token.accessToken = user?.accessToken;
      }
      return token;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
