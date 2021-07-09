import Head from "next/head";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FunctionComponent } from "react";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
};

export const Layout: FunctionComponent<Props> = ({
  title,
  keywords,
  description,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className="container mx-md">{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Shopping",
  description: "Shopping",
  keywords: "shop",
};
