"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { api } from "@adapters/index";
import { State } from "types/form-state";
import { IValidatedPost, postSchema, validateForm } from "@validators/post";
import { BASE_URL } from "@config/index";

export async function updatePost(id: string, _: unknown, formData: FormData) {
  const { userId } = await auth();

  const data = Object.fromEntries(formData) as z.infer<typeof postSchema>;

  const errors = validateForm(data as IValidatedPost);

  if (errors) {
    return errors;
  }

  await api.put({
    url: `${BASE_URL}/post`,
    body: { ...data, id, userId },
  });

  return {
    success: true,
  } satisfies State;
}
