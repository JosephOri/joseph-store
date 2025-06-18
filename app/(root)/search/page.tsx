import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/products.actions";

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const products = await getAllProducts({
    query: q,
    category,
    page: Number(page),
    price,
    sort,
    rating,
  });

  console.log(products);

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">{/* FILTERS */}</div>
      <div className="space-y-4 md:col-span-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products!.data.length === 0 && <div>No product found</div>}
          {products!.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products!.totalPages! > 1 && (
          <Pagination page={page} totalPages={products!.totalPages} />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
