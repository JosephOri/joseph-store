"use client";
import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

interface Props {
  item: CartItem;
}
const AddToCart = ({ item }: Props) => {
  const router = useRouter();

  const handleAddToCart = async () => {
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
  };
  return (
    <Button className="w-full justify-center" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
