"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(prevState: unknown, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields",
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validatedFields.data;

    // Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return {
        error: "Email is already registered",
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    await db.insert(users).values({
      name,
      email,
      passwordHash,
    });

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
