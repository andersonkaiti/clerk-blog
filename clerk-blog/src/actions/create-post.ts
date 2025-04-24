"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { api } from "@adapters/index";
import { State } from "types/form-state";
import { IValidatedPost, postSchema, validateForm } from "@validators/post";
import { BASE_URL } from "@config/index";

export async function createPost(_: unknown, formData: FormData) {
  const { userId } = await auth();

  const data = Object.fromEntries(formData) as z.infer<typeof postSchema>;

  const errors = validateForm(data);

  if (errors) {
    return errors;
  }

  await api.post<IValidatedPost>({
    url: `${BASE_URL}/post`,
    body: { ...data, userId },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
  } satisfies State;
}
