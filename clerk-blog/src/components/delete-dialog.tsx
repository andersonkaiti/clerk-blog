"use client";

import { Trash } from "lucide-react";
import * as Dialog from "@components/ui/dialog";
import { IPost } from "types/user-post";
import { useDeleteDialog } from "@hooks/delete-post.hook";

export interface IDeleteDialogProps {
  post: IPost;
}

export function DeleteDialog({ post }: IDeleteDialogProps) {
  const { opened, setOpened, handleDelete } = useDeleteDialog(post);

  return (
    <Dialog.Root open={opened} onOpenChange={setOpened}>
      <Dialog.Trigger className="flex cursor-pointer items-center gap-1 font-medium text-red-500 hover:underline">
        <Trash color="oklch(63.7% 0.237 25.331)" size={14} />
        Remover
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            Você tem certeza de que deseja deletar a publicação?
          </Dialog.Title>
        </Dialog.Header>
        <button
          type="submit"
          className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-600 bg-neutral-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none sm:w-fit"
          onClick={handleDelete}
        >
          <Trash color="#fff" size={14} />
          Remover
        </button>
      </Dialog.Content>
    </Dialog.Root>
  );
}
