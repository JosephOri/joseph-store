"use server";

import { signInFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in with credentials
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

// Sign out
export async function signOutUser() {
  await signOut();
}
