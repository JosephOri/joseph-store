"use client";

import { Product } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, updateProductSchema } from "@/lib/validators";
import { productDefaultValues } from "@/lib/constants";
import { Form } from "../ui/form";

interface Props {
  type: "Create" | "Update";
  product?: Product;
  productId?: string;
}

const ProductForm = ({ type, product, productId }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    // @ts-expect-error zodResolver type error
    resolver:
      type === "Update"
        ? zodResolver(updateProductSchema)
        : zodResolver(insertProductSchema),
    defaultValues:
      product && type === "Update" ? product : productDefaultValues,
  });

  const onSubmit = () => {
    return;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Name */}
          {/* Slug */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Category */}
          {/* Brand */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Price */}
          {/* Stock */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">{/* Images */}</div>
        <div className="upload-field">{/* isFeatured */}</div>
        <div>{/* Description */}</div>
        <div>{/* Submit */}</div>
      </form>
    </Form>
  );
};

export default ProductForm;
