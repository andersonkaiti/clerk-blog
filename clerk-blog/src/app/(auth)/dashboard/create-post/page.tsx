"use client";

import { cn } from "@utils/cn";
import Form from "next/form";
import { Spinner } from "@components/spinner";
import { TipTapInput } from "@components/tiptap/tiptap";
import { useCreatePost } from "@hooks/create-post.hook";

export default function CreatePost() {
  const { createPostAction, pending, state } = useCreatePost();

  const isError = state && "errors" in state;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4 sm:p-10">
      <Form
        action={createPostAction}
        className="mx-auto w-full space-y-4 px-4 sm:max-w-4xl"
      >
        <div className="w-full space-y-2">
          <label
            htmlFor="title"
            className={cn(
              "mb-2 block text-sm font-medium text-gray-900 dark:text-white",
              isError && state?.errors.title && "text-red-500",
            )}
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            className={cn(
              "w-full rounded-lg border-2 border-gray-700 bg-black p-2 text-[14px] transition-all duration-150 ease-in-out outline-none focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b]",
              isError &&
                state?.errors.title &&
                "border-red-500 focus-within:ring-red-600",
            )}
            name="title"
          />
          {isError && state?.errors.title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="w-full space-y-2">
          <label
            htmlFor="text"
            className={cn(
              "mb-2 block text-sm font-medium text-gray-900 dark:text-white",
              isError && state?.errors.text && "text-red-500",
            )}
          >
            Texto
          </label>
          <TipTapInput
            className={cn(
              "rounded-lg border-2 border-gray-700 bg-black p-2 text-[14px] transition-all duration-150 ease-in-out outline-none focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-offset-2 focus-within:ring-offset-[#09090b]",
              isError &&
                state?.errors.text &&
                "border-red-500 focus-within:ring-red-600",
            )}
          />
          {isError && state?.errors.text && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.text}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-black px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none"
        >
          {pending ? (
            <>
              <Spinner /> Processando...
            </>
          ) : (
            "Cadastrar post"
          )}
        </button>
      </Form>
    </div>
  );
}
