"use client";

import { Suspense, useState } from "react";
import { CirclePlus } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { DashboardSkeleton } from "@components/dashboard-table/skeleton";
import { Filter } from "@components/filter";
import { PaginationButtonSkeleton } from "@components/pagination/pagination-button-skeleton";

const DynamicDashboardTable = dynamic(
  () => import("@components/dashboard-table/dashboard-table"),
);

export default function Dashboard() {
  const [filter, setFilter] = useState("");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center p-5 shadow-md sm:rounded-lg">
        <div className="flex w-full items-center justify-between gap-2 py-4">
          <Filter
            url={filter && `/dashboard/?filter=${filter}`}
            filter={filter}
            setFilter={setFilter}
          />
          <Link
            href="/dashboard/create-post"
            className="focus:ring-neutral-850 inline-flex w-fit items-center gap-2 rounded-lg border border-gray-700 bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-600 focus:outline-none"
          >
            <CirclePlus className="hover:text-gray-200" />
            Cadastrar
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex w-full flex-1 flex-col items-center justify-between gap-4 pb-5">
              <DashboardSkeleton.Root>
                <DashboardSkeleton.Table />
              </DashboardSkeleton.Root>
              <PaginationButtonSkeleton />
            </div>
          }
        >
          <DynamicDashboardTable filter={filter} />
        </Suspense>
      </div>
    </div>
  );
}
