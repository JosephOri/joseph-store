"use server";

import { CartItem } from "@/types";
import { prisma } from "@/db/prisma";
import { insertCartSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";
import { round2 } from "@/lib/utils";
import { cookies } from "next/headers";
import { getCurrentUser } from "../user.actions";
import { convertToPlainObject } from "@/lib/utils";

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 10 : 0);
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
const getSessionCartId = async () => {
  return (await cookies()).get("sessionCartId")?.value;
};
async function createCart(item: CartItem, sessionCartId: string, userId?: string | null) {
  const validatedData = insertCartSchema.parse({
    userId: userId,
    items: [item],
    sessionCartId: sessionCartId,
    ...calcPrice([item]),
  });
  const cart = await prisma.cart.create({
    data: validatedData,
  });
  return cart;
}

async function getMyCart() {
  const sessionCartId = await getSessionCartId();
  if (!sessionCartId) throw new Error("Session cart ID not found");

  const currentUser = await getCurrentUser();
  const userId = currentUser?.id ? (currentUser.id as string) : undefined;

  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });
  if (!cart) return undefined;

  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

async function updateCart(id: string, items: Prisma.CartUpdateitemsInput[]) {
  return prisma.cart.update({
    where: { id },
    data: {
      items,
      ...calcPrice(items as CartItem[]),
    },
  });
}

async function deleteCart(id: string) {
  try {
    await prisma.cart.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Cart deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete cart",
    };
  }
}

export { updateCart, deleteCart, getMyCart, createCart, getSessionCartId, calcPrice };
