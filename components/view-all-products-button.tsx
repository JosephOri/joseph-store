"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ViewAllProductsButton = () => {
  const router = useRouter();

  return (
    <div className="my-8 flex items-center justify-center">
      <Button
        onClick={() => router.push("/search")}
        className="px-8 py-4 text-lg font-semibold"
      >
        View All Products
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
