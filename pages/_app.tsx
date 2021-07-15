import { store } from "app/store";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as NextAuthProvider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/config/apolloClient";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />;
        </ApolloProvider>
      </NextAuthProvider>
    </ReduxProvider>
  );
}
export default MyApp;
