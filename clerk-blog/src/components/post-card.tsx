import { formatTime } from "@utils/format-time";
import { stripHtml } from "@utils/strip-html";
import { Clock } from "lucide-react";
import Link from "next/link";
import { IPost } from "types/user-post";

export interface IPostCardProps {
  post: IPost;
}

export function PostCard({ post }: IPostCardProps) {
  return (
    <div className="flex w-full flex-col justify-between space-y-2 rounded-lg border border-gray-700 bg-black p-4 shadow-sm transition-all hover:border-indigo-500 hover:shadow-indigo-500/20">
      <h6 className="flex w-fit items-center gap-2 rounded-md bg-blue-500/10 px-2 text-xs text-indigo-500">
        <Clock className="w-4" /> {formatTime(post.updatedAt)}
      </h6>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        {post.title}
      </h5>
      <p
        className="mb-3 font-normal text-gray-400"
        dangerouslySetInnerHTML={{
          __html:
            post.text.length > 50
              ? `${stripHtml(post.text).slice(0, 50).trim()}...`
              : stripHtml(post.text),
        }}
      ></p>
      <Link
        href={`/post/${post.id}`}
        className="focus:ring-neutral-850 inline-flex w-fit items-center rounded-lg border border-gray-700 bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-600 focus:outline-none"
      >
        Mais informações
      </Link>
    </div>
  );
}
