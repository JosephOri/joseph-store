"use server";
import { prisma } from "@/db/prisma";

async function getProductById(id: string) {
  return await prisma.product.findFirst({
    where: { id },
  });
}

export { getProductById };
