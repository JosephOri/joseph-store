import { Metadata } from "next";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@/auth";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps/CheckoutSteps";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  return (
    <>
      <CheckoutSteps currentStep={2} />
      <PaymentMethodForm prefferedPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
