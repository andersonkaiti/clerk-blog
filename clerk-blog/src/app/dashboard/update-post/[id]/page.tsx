"use client";

import { Spinner } from "@components/spinner";
import { useUpdateForm } from "@hooks/update-form.hook";
import clsx from "clsx";
import Form from "next/form";
import { twMerge } from "tailwind-merge";

export default function UpdatePage() {
  const { post, state, updatePostAction, pending } = useUpdateForm();

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-4">
      <Form
        action={updatePostAction}
        className="mx-auto w-full space-y-4 px-4 sm:max-w-4xl"
      >
        <div className="w-full space-y-2">
          <label
            htmlFor="title"
            className={twMerge(
              "mb-2 block text-sm font-medium text-gray-900 dark:text-white",
              clsx(state?.errors.title && "text-red-500"),
            )}
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            className={twMerge(
              "block w-full rounded-lg border border-gray-600 bg-neutral-950 p-2.5 text-sm text-white placeholder-gray-400",
              clsx(state?.errors.title && "border-red-500"),
            )}
            name="title"
            defaultValue={post.title}
          />
          {state && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="w-full space-y-2">
          <label
            htmlFor="text"
            className={twMerge(
              "mb-2 block text-sm font-medium text-gray-900 dark:text-white",
              clsx(state?.errors.text && "text-red-500"),
            )}
          >
            Texto
          </label>
          <textarea
            id="text"
            className={twMerge(
              "block w-full rounded-lg border border-gray-600 bg-neutral-950 p-2.5 text-sm text-white placeholder-gray-400",
              clsx(state?.errors.text && "border-red-500"),
            )}
            name="text"
            defaultValue={post.text}
          />
          {state && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {state.errors.text}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-600 bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none"
        >
          {pending && <Spinner />}
          Atualizar post
        </button>
      </Form>
    </div>
  );
}
