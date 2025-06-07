"use server";

import { CartItem } from "@/types";
import { formatError } from "../utils";
import { getCurrentUser } from "./user.actions";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import {
  createCart,
  getMyCart,
  updateCart,
  getSessionCartId,
  calcPrice,
} from "./crud/cart.crud";
import { getProductById } from "./crud/product.crud";

export async function addItemToCart(data: CartItem) {
  try {
    const sessionCartId = await getSessionCartId();
    if (!sessionCartId) throw new Error("Session cart ID not found");

    const currentUser = await getCurrentUser();
    const userId = currentUser?.id ? (currentUser.id as string) : undefined;
    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);

    const product = await getProductById(item.productId);
    if (!product) throw new Error("Product not found");

    if (!cart) {
      await createCart(item, sessionCartId, userId);
      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: "Item added to cart successfully",
      };
      // TODO: refactor
    } else {
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId,
      );
      // If not enough stock, throw error
      if (existItem) {
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }

        // Increase quantity of existing item
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId,
        )!.qty = existItem.qty + 1;
      } else {
        // If stock, add item to cart
        if (product.stock < 1) throw new Error("Not enough stock");
        cart.items.push(item);
      }

      // Save to database
      await updateCart(cart.id, cart.items as Prisma.CartUpdateitemsInput[]);

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "added to"} cart successfully`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = await getSessionCartId();
    if (!sessionCartId) throw new Error("Session cart ID not found");

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId,
    );
    if (!exist) throw new Error("Item not found");

    if (exist.qty === 1) {
      // If quantity is 1, remove item
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId,
      );
    } else {
      // If quantity is greater than 1, decrease quantity
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // Save to database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} removed from cart successfully`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
