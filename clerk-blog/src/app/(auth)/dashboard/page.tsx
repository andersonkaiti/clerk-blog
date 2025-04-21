import { Fragment } from "react";
import { parseTime } from "@utils/parse-time";
import { CirclePlus, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteDialog } from "@components/delete-dialog";
import { Filter } from "@components/filter";
import { Table } from "@components/table";
import { getUserPosts } from "@actions/get-user-posts";
import { IPost } from "types/user-post";

export interface IDashboardProps {
  searchParams: Promise<{ filter: string }>;
}

export default async function Dashboard({ searchParams }: IDashboardProps) {
  const { filter = "" } = await searchParams;

  const posts: IPost[] = await getUserPosts(filter);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center lg:w-fit">
      <Filter url={filter && `/dashboard/?filter=${filter}`} filter={filter} />
      <div className="w-full overflow-x-auto p-5 shadow-md sm:rounded-lg">
        <Table.Root>
          <Table.Head>
            <Table.Title>Título</Table.Title>
            <Table.Title>Publicado</Table.Title>
            <Table.Title>Atualizado</Table.Title>
            <Table.Title>Ações</Table.Title>
            <Table.Title>
              <Link
                href="/dashboard/create-post"
                className="flex items-center gap-2 hover:text-gray-200"
                prefetch={true}
              >
                <CirclePlus className="hover:text-gray-200" />
                Cadastrar
              </Link>
            </Table.Title>
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
                      prefetch={true}
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
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
