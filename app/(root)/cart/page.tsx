import { Metadata } from "next";
import CartTable from "./cart-table";
import { getMyCart } from "@/lib/actions/crud/cart.crud";

export const metadata: Metadata = {
  title: "Cart",
};
const CartPage = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
