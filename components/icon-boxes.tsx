import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-4 md:grid-cols-4">
        <div className="space-y-2">
          <ShoppingBag />
          <div className="text-sm font-bold">Free Shipping</div>
          <p className="text-muted-foreground text-sm">
            Free shipping on all orders over $100
          </p>
        </div>
        <div className="space-y-2">
          <DollarSign />
          <div className="text-sm font-bold">Money Back Guarantee</div>
          <p className="text-muted-foreground text-sm">
            Within 30 days of purchase
          </p>
        </div>
        <div className="space-y-2">
          <WalletCards />
          <div className="text-sm font-bold">Flexible Payment</div>
          <p className="text-muted-foreground text-sm">
            Pay With Credit Card, COD or PayPal
          </p>
        </div>
        <div className="space-y-2">
          <Headset />
          <div className="text-sm font-bold">24/7 Support</div>
          <p className="text-muted-foreground text-sm">
            Available 24/7 for any questions
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IconBoxes;
