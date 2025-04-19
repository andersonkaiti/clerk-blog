import { parseTime } from "@utils/parse-time";
import Link from "next/link";
import { IPost } from "types/user-post";

export interface IPostCardProps {
  post: IPost;
}

export function PostCard({ post }: IPostCardProps) {
  return (
    <div className="flex w-full flex-col justify-between space-y-2 rounded-lg border border-gray-700 bg-black p-4 shadow-sm">
      <h6 className="text-xs text-gray-400">{parseTime(post.updatedAt)}</h6>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        {post.title}
      </h5>
      <p className="mb-3 font-normal text-gray-400">
        {post.text.length > 50
          ? `${post.text.slice(0, 50).trim()}...`
          : post.text}
      </p>
      <Link
        href={`/post/${post.id}`}
        className="focus:ring-neutral-850 inline-flex w-fit items-center rounded-lg border border-gray-700 bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-600 focus:outline-none"
      >
        Mais informações
      </Link>
    </div>
  );
}
