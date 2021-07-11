import { Provider as NextAuthProvider } from "next-auth/client";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Component {...pageProps} />;
    </NextAuthProvider>
  );
}
export default MyApp;
