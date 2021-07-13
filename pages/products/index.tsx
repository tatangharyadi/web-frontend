import { Product } from "@/models/product.interface";
import { Layout } from "@/components/Layout";
import { FC } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GetServerSideProps, GetStaticProps } from "next";

type Props = {
  data: Array<Product>;
};

const ProductsPage: FC<Props> = ({ data }) => {
  return (
    <Layout title="Products">
      <h1>Products</h1>
      {data.map((product: Product) => (
        <div key={product._id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </Layout>
  );
};

const GQL_QUERY = gql`
  {
    products(limit: 1, offset: 1) {
      _id
      name
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = new ApolloClient({
    uri: "http://api:3000/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GQL_QUERY,
  });

  return {
    props: { data: data.products },
  };
};

export default ProductsPage;
