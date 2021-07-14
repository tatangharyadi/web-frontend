import { Product } from "@/models/product.interface";
import { gql, useQuery } from "@apollo/client";

type Products = Array<Product>;

export const GQL_QUERY = gql`
  query products($limit: Int!, $offset: Int!) {
    products(limit: $limit, offset: $offset) {
      _id
      name
    }
  }
`;

export const queryVars = {
  limit: 1,
  offset: 1,
};

export const ProductList = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GQL_QUERY,
    {
      variables: queryVars,
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <h1>Error loading posts.</h1>;
  if (loading) return <h1>Loading</h1>;

  const { products: Products } = data;

  return (
    <div>
      {Products.map((product: Product) => (
        <div key={product._id}>
          <h1>{product.name}</h1>
        </div>
      ))}
    </div>
  );
};
