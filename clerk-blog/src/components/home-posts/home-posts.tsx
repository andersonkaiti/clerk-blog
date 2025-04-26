"use client";

import { PostCard } from "@components/post-card";
import { IPost } from "types/user-post";
import { useGetAllPosts } from "@hooks/get-all-posts.hook";
import { HomePagination } from "./home-pagination";
import { HomeSkeleton } from "./skeleton";

export interface IHomePostsProps {
  filter: string;
}

export default function HomePosts({ filter }: IHomePostsProps) {
  const { posts, pagination, isLoading, isFetching } = useGetAllPosts(filter);

  const isDataLoading = isLoading || isFetching;

  return (
    <>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2">
        {isDataLoading ? (
          <HomeSkeleton.Cards />
        ) : (
          <>
            {posts?.map((post: IPost, index: number) => (
              <PostCard post={post} key={index} />
            ))}
          </>
        )}
      </div>

      {!isDataLoading && posts?.length === 0 && (
        <p className="text-center">Ainda não há nenhum post.</p>
      )}

      <HomePagination pagination={pagination} />
    </>
  );
}
