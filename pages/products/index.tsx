import { GQL_QUERY, ProductList, queryVars } from "@/components/ProductList";
import { Layout } from "@/components/Layout";
import { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "@/config/apolloClient";

const ProductsPage = () => {
  return (
    <Layout title="Products">
      <ProductList />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GQL_QUERY,
    variables: queryVars,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default ProductsPage;
