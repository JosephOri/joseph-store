import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/products.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList products={latestProducts} title="Featured Products" limit={LATEST_PRODUCTS_LIMIT} />
    </>
  );
};

export default HomePage;
