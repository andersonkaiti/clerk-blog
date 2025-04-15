import { getAllPosts, IUserPost } from "@actions/post";
import Link from "next/link";

export default async function Home() {
  const posts: IUserPost[] = await getAllPosts();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4">
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {posts.map((post: IUserPost, index: number) => (
          <div
            key={index}
            className="flex w-full flex-col justify-between rounded-lg border border-gray-700 bg-neutral-950 p-6 shadow-sm"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {post.title}
            </h5>
            <p className="mb-3 font-normal text-gray-400">
              {post.user[0].emailAddresses[0].emailAddress} -{" "}
              {post.user[0].fullName}
            </p>
            <Link
              href={`/post/${post.id}`}
              className="inline-flex w-fit items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Mais informações
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
