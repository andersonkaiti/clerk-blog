import { IUserPost } from "@actions/post";
import Link from "next/link";

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
        {post.user[0].emailAddresses[0].emailAddress} - {post.user[0].fullName}
      </p>
      <Link
        href={`/post/${post.id}`}
        className="inline-flex w-fit items-center rounded-lg  px-3 py-2 text-center text-sm font-medium text-white  focus:ring-4  focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        Mais informações
      </Link>
    </div>
  );
}
