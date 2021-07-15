import { useAppDispatch } from "../app/hook";
import { productAdded, productRemoved } from "../features/cart/cartSlice";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaHeart,
  FaBackspace,
} from "react-icons/fa";
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
  const dispatch = useAppDispatch();

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GQL_QUERY,
    {
      variables: queryVars,
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return <h1>Error loading posts.</h1>;
  if (loading) return <h1>Loading</h1>;

  const { products }: { products: Products } = data;

  const handleShoppingCart = (code: string) => {
    dispatch(
      productAdded({
        code,
        qtyOrder: 1,
      })
    );
  };

  const handleBackspace = (code: string) => {
    dispatch(productRemoved(code));
  };

  return (
    <div className="flex">
      {products.map((product: Product) => (
        <div key={product._id} className="m-3 p-3 shadow">
          <div className="flex justify-center items-center group">
            <div className="overflow-hidden relative">
              <img
                src="https://picsum.photos/200/300"
                width="200"
                height="300"
                className="rounded"
              ></img>
            </div>
            <div
              className="flex absolute gap-1 text-2xl bg-gray-700 text-gray-100 opacity-0 
                    group-hover:opacity-100 transition duration-300"
            >
              <button
                onClick={() => handleShoppingCart(product.name)}
                className="p-2 hover:bg-red-500"
              >
                <FaShoppingCart />
              </button>
              <a className="p-2 hover:bg-red-500">
                <FaHeart />
              </a>
              <button
                onClick={() => handleBackspace(product.name)}
                className="p-2 hover:bg-red-500"
              >
                <FaBackspace />
              </button>
            </div>
          </div>
          <a className="font-semibold text-gray-700 ">{product.name}</a>
          <div className="flex gap-1">
            <p className="text-xs text-gray-700">$79.99</p>
            <p className="text-xs line-through text-red-500">$99.99</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="flex text-xs text-yellow-500">
              <FaStar /> <FaStarHalfAlt />
              <FaRegStar />
            </div>
            <div>
              <p className="text-xs text-gray-700">(100)</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
