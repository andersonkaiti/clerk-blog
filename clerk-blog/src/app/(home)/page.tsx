"use client";

import { Suspense, useState } from "react";
import { DottedBackground } from "@components/dotted-background";
import { Filter } from "@components/filter";
import { HomePosts } from "@components/home-posts/home-posts";
import HomePostsSkeleton from "@components/home-posts/home-posts-skeleton";

export default function Home() {
  const [filter, setFilter] = useState("");

  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center space-y-4 p-4 sm:p-10">
        <Filter url="/" filter={filter} setFilter={setFilter} />

        <Suspense fallback={<HomePostsSkeleton />}>
          <HomePosts filter={filter} />
        </Suspense>
      </div>
    </DottedBackground>
  );
}
