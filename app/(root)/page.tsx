import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import {
  getLatestProducts,
  getFeaturedProducts,
} from "@/lib/actions/products.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList
        products={latestProducts}
        title="Featured Products"
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
};

export default HomePage;
