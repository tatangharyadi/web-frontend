import { Provider as NextAuthProvider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/config/apolloClient";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <NextAuthProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />;
      </ApolloProvider>
    </NextAuthProvider>
  );
}
export default MyApp;
