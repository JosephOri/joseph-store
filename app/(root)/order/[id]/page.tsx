import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();
  let clientSecret = null;

  if (order.paymentMethod.toLocaleLowerCase() === "stripe" && !order.isPaid) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create a new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100),
      currency: "USD",
      metadata: { orderId: order.id },
    });
    clientSecret = paymentIntent.client_secret;
  }

  return (
    <div>
      <OrderDetailsTable
        order={{
          ...order,
          orderitems: order.orderItems,
          shippingAddress: order.shippingAddress as ShippingAddress,
          user: (await getCurrentUser()) as { name: string; email: string },
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === "admin"}
        stripeClientSecret={clientSecret}
      />
    </div>
  );
};

export default OrderDetailsPage;
