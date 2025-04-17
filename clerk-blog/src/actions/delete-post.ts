"use server";

import { revalidatePath } from "next/cache";
import { api } from "@adapters/index";
import { validateUser } from "@validators/post";
import { BASE_URL } from "@config/index";

export async function deletePost(userId: string, id: string) {
  await validateUser(userId);

  await api.delete({
    url: `${BASE_URL}/post/${id}`,
  });

  revalidatePath("/dashboard");
}
