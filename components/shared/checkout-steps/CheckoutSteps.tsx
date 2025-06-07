import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  current?: number;
}

const CheckoutSteps = ({ current = 0 }: Props) => {
  return (
    <div className="flex-between mb-10 flex-col space-y-2 space-x-2 md:flex-row">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                "w-56 rounded-full p-2 text-center text-sm",
                index === current ? "bg-secondary" : "",
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <hr className="mx-2 w-16 border-t border-gray-300" />
            )}
          </React.Fragment>
        ),
      )}
    </div>
  );
};
export default CheckoutSteps;
