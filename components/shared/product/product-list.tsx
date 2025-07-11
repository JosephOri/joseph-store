import React from "react";
import ProductCard from "./product-card";
import { Product } from "@/types";

interface Props {
  products: Product[];
  title?: string;
  limit?: number;
}

const ProductList = ({ products, title, limit }: Props) => {
  const limitedData = limit ? products.slice(0, limit) : products;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product: Product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
