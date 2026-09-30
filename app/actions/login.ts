"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginUser(prevState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google");
}
