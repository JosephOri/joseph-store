"use client";
import { createOrder } from "@/lib/actions/order.actions";
import { useFormStatus } from "react-dom";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PlaceOrderForm = () => {
  const router = useRouter();

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}{" "}
        Place Order
      </Button>
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await createOrder();
    if (res.redirectTo) {
      router.push(res.redirectTo);
      return;
    }
  };
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
