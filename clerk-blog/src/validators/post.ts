"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, {
    message: "Título muito curto!",
  }),
  text: z.string().min(1, {
    message: "Texto muito curto!",
  }),
});

export interface IValidatedPost {
  title: string;
  text: string;
  userId: string;
  id: string;
}

export interface IErrors {
  errors: { [K in keyof IValidatedPost]?: string[] };
}

export function validateForm(formData: z.infer<typeof postSchema>) {
  const { success, error } = postSchema.safeParse(formData);

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    } satisfies IErrors;
  }
}

export async function validateUser(postUserId: string) {
  const { userId } = await auth();

  if (postUserId !== userId) {
    redirect("/dashboard");
  }
}
