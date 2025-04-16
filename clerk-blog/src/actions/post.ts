"use server";

import { api } from "@adapters/index";
import { auth } from "@clerk/nextjs/server";
import { BASE_URL } from "@config/index";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IPost } from "types/user-post";
import z from "zod";

const postSchema = z.object({
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

function validateForm(formData: z.infer<typeof postSchema>) {
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
  redirect("/dashboard");
}

export async function deletePost(userId: string, id: string) {
  await validateUser(userId);

  await api.delete({
    url: `${BASE_URL}/post/${id}`,
  });

  revalidatePath("/dashboard");
}

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

  redirect("/dashboard");
}

export async function getUserPosts() {
  const session = await auth();

  if (!session || !session.userId) {
    throw new Error("Usuário não autenticado.");
  }

  return await api.get<IPost>({
    url: `${BASE_URL}/post/by-user-id/${session.userId}`,
  });
}

export async function getAllPosts() {
  return await api.get<IPost>({
    url: `${BASE_URL}/post`,
  });
}

export async function getPostByID(id: string) {
  return (
    await api.get<IPost>({
      url: `${BASE_URL}/post/by-post-id/${id}`,
    })
  )[0];
}

export async function getPostByIDToUpdate(id: string) {
  const [post] = await api.get<IPost>({
    url: `${BASE_URL}/post/by-post-id/${id}`,
  });

  await validateUser(post.userId);

  return post;
}
