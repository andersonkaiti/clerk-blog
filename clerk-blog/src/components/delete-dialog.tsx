import { deletePost, IUserPost } from "@actions/post";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Trash } from "lucide-react";
import Form from "next/form";

export function DeleteDialog({ post }: { post: IUserPost }) {
  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer items-center gap-1 font-medium text-red-500 hover:underline">
        <Trash color="oklch(63.7% 0.237 25.331)" size={14} />
        Remover
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Você tem certeza de que deseja deletar a publicação
          </DialogTitle>
        </DialogHeader>
        <Form action={deletePost.bind(null, post.userId, post.id)}>
          <button
            type="submit"
            className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-600 bg-neutral-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none sm:w-fit"
          >
            <Trash color="#fff" size={14} />
            Remover
          </button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
