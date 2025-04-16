import Link from "next/link";
import { IUserPost } from "types/user-post";

export interface IPostCardProps {
  post: IUserPost;
}

export function PostCard({ post }: IPostCardProps) {
  return (
    <div className="flex w-full flex-col justify-between rounded-lg border border-gray-700 bg-neutral-950 p-6 shadow-sm">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
        {post.title}
      </h5>
      <p className="mb-3 font-normal text-gray-400">
        {post.user.email_addresses[0].email_address} - {post.user.first_name}{" "}
        {post.user.last_name}
      </p>
      <Link
        href={`/post/${post.id}`}
        className="inline-flex w-fit items-center rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 focus:outline-none"
      >
        Mais informações
      </Link>
    </div>
  );
}
