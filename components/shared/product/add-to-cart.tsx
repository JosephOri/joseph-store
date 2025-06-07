"use client";
import { Cart, CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

interface Props {
  item: CartItem;
  cart?: Cart;
}
const AddToCart = ({ item, cart }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(`${item.name} added to cart successfully`, {
        action: {
          label: "Go to cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
      router.refresh();
    });
  };

  const handleRemoveFromCart = () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(`${item.name} removed from cart successfully`);
      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);
  return (
    <>
      {existItem ? (
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handleRemoveFromCart}
          >
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Minus className="h-4 w-4" />
            )}
          </Button>
          <span className="px-2">{existItem.qty}</span>
          <Button type="button" variant="outline" onClick={handleAddToCart}>
            {isPending ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </Button>
        </div>
      ) : (
        <Button
          className="w-full justify-center"
          type="button"
          onClick={handleAddToCart}
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
