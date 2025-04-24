"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { DottedBackground } from "@components/dotted-background";
import { Filter } from "@components/filter";
import HomePostsSkeleton from "@components/home-posts/home-posts-skeleton";

const DynamicHomePosts = dynamic(
  () => import("@components/home-posts/home-posts"),
);

export default function Home() {
  const [filter, setFilter] = useState("");

  return (
    <DottedBackground>
      <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col items-center space-y-4 p-4 sm:p-10">
        <Filter url="/" filter={filter} setFilter={setFilter} />

        <Suspense fallback={<HomePostsSkeleton />}>
          <DynamicHomePosts filter={filter} />
        </Suspense>
      </div>
    </DottedBackground>
  );
}
