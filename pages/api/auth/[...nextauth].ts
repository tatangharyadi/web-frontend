import { axiosAPI } from "@/config/axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { ToastContainer } from "react-toastify";

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

        const res = await axiosAPI.post("auth/login", {
          email: username,
          password,
        });

        const cookie = res.headers["set-cookie"];
        const { data } = res;

        if (data) {
          return { ...data, cookie };
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
  secret: "secret",
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
    async session(session, token) {
      console.log(token);
      return session;
    },
  },
});
