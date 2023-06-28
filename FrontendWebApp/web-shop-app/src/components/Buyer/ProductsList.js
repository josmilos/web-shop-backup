import { Fragment } from "react";
import ProductItem from "./ProductItem";
import { useLoaderData } from "react-router-dom";



const ProductsList = () => {
  const products = useLoaderData();
  return (
    <div style={{display: 'flex'}}>
      {products.map((product) => (
        <ProductItem product={product} key={product.productId}></ProductItem>
      ))}
    </div>
  );
};

export default ProductsList;
