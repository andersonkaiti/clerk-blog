import { auth } from "@clerk/nextjs/server";
import { api } from "@adapters/index";
import { IPost } from "types/user-post";
import { BASE_URL } from "@config/index";

export async function getUserPosts(filter: string) {
  const session = await auth();

  if (!session || !session.userId) {
    throw new Error("Usuário não autenticado.");
  }

  return await api.get<IPost>({
    url: `${BASE_URL}/post/by-user-id/${session.userId}/${filter}`,
  });
}
