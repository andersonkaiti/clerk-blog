import { auth } from "@clerk/nextjs/server";
import { stripHtml } from "@utils/strip-html";
import { redirect } from "next/navigation";
import z from "zod";
import { State } from "types/form-state";

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

export function validateForm({ title, text }: z.infer<typeof postSchema>) {
  const { success, error } = postSchema.safeParse({
    title,
    text: stripHtml(text).replace(/\s/g, ""),
  });

  if (!success) {
    return {
      errors: error.flatten().fieldErrors,
    } satisfies State;
  }
}

export async function validateUser(postUserId: string) {
  const { userId } = await auth();

  if (postUserId !== userId) {
    redirect("/dashboard");
  }
}
