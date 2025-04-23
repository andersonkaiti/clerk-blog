import { Fragment } from "react";
import { parseTime } from "@utils/parse-time";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteDialog } from "@components/delete-dialog";
import { Table } from "@components/table";
import { IPost } from "types/user-post";
import { useGetUserPosts } from "@hooks/get-user-posts.hook";

export interface IDashboardTableProps {
  filter: string;
}

export function DashboardTable({ filter }: IDashboardTableProps) {
  const { data: posts } = useGetUserPosts(filter);

  return (
    <Table.Root>
      <Table.Head>
        <Table.Title>Título</Table.Title>
        <Table.Title>Publicado</Table.Title>
        <Table.Title>Atualizado</Table.Title>
        <Table.Title colSpan={2}>Ações</Table.Title>
      </Table.Head>
      <Table.Body>
        {posts?.map((post: IPost, index: number) => (
          <Fragment key={index}>
            <Table.Row>
              <Table.RowHead>{post.title}</Table.RowHead>
              <Table.RowHead>{parseTime(post.createdAt)}</Table.RowHead>
              <Table.RowHead>{parseTime(post.updatedAt)}</Table.RowHead>
              <Table.RowHead className="flex gap-10">
                <Link
                  href={`/dashboard/update-post/${post.id}`}
                  className="flex items-center gap-2 font-medium text-blue-500 hover:underline"
                >
                  <Pencil color="oklch(62.3% 0.214 259.815)" size={14} />
                  Editar
                </Link>
              </Table.RowHead>
              <Table.RowHead>
                <DeleteDialog post={post} />
              </Table.RowHead>
            </Table.Row>
          </Fragment>
        ))}

        {posts?.length === 0 && (
          <Table.Row>
            <Table.RowHead colSpan={4} className="text-center">
              Você ainda não tem nenhum post.
            </Table.RowHead>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
