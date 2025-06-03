"use server";

import { signInFormSchema } from "@/lib/validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signUpFormSchema } from "@/lib/validators";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "@/lib/utils";

export async function signInWithCredentials(prevState: unknown, data: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: data.get("email") || "",
      password: data.get("password") || "",
    });
    await signIn("credentials", user);

    return {
      success: true,
      message: "User signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      password: formData.get("password") || "",
      confirmPassword: formData.get("confirmPassword") || "",
    });
    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: user.confirmPassword,
    });

    return {
      success: true,
      message: "User signed up successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error("User not found");
  return user;
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
