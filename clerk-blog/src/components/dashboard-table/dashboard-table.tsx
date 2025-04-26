"use client";

import { Fragment } from "react";
import { formatTime } from "@utils/format-time";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteDialog } from "@components/delete-dialog";
import * as Table from "@components/ui/table";
import { IPost } from "types/user-post";
import { useUserPosts } from "@hooks/user-posts.hook";
import { DashboardPagination } from "./dashboard-pagination";
import { DashboardSkeleton } from "./skeleton";

export interface IDashboardTableProps {
  filter: string;
}

export default function DashboardTable({ filter }: IDashboardTableProps) {
  const {
    optimisticPosts,
    handleDeletePost,
    pagination,
    isLoading,
    isFetching,
  } = useUserPosts(filter);

  const isDataLoading = isLoading || isFetching;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between gap-4 pb-5">
      {isDataLoading ? (
        <DashboardSkeleton.Table />
      ) : (
        <Table.Root className="overflow-x-auto bg-black">
          <Table.Header>
            <Table.Row>
              <Table.Head>Título</Table.Head>
              <Table.Head>Publicado</Table.Head>
              <Table.Head>Atualizado</Table.Head>
              <Table.Head colSpan={2}>Ações</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {optimisticPosts?.map((post: IPost, index: number) => (
              <Fragment key={index}>
                <Table.Row>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{formatTime(post.createdAt)}</Table.Cell>
                  <Table.Cell>{formatTime(post.updatedAt)}</Table.Cell>
                  <Table.Cell className="flex gap-10">
                    <Link
                      href={`/dashboard/update-post/${post.id}`}
                      className="flex items-center gap-2 font-medium text-blue-500 hover:underline"
                    >
                      <Pencil color="oklch(62.3% 0.214 259.815)" size={14} />
                      Editar
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteDialog
                      post={post}
                      handleDeletePost={handleDeletePost}
                    />
                  </Table.Cell>
                </Table.Row>
              </Fragment>
            ))}

            {!isDataLoading && optimisticPosts?.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">
                  Você ainda não tem nenhum post.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      )}

      <DashboardPagination pagination={pagination} />
    </div>
  );
}
