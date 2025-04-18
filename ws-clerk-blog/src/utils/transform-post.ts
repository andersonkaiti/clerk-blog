import type { Posts } from "@prisma/client";
import type { ITransformedPosts } from "../models/itransformed-post.d.ts";
import { decode } from "./decode-buffer.ts";

export function transformPost(data: Posts[]): ITransformedPosts[];
export function transformPost(data: Posts): ITransformedPosts;

export function transformPost(
  data: Posts[] | Posts
): ITransformedPosts | ITransformedPosts[] {
  if (Array.isArray(data)) {
    return data.map(({ title, text, ...rest }) => ({
      title: decode(title),
      text: decode(text),
      ...rest,
    }));
  }

  const { title, text, ...rest } = data as Posts;

  return {
    title: decode(title),
    text: decode(text),
    ...rest,
  };
}
