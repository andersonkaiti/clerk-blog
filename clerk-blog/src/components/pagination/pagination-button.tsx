"use client";

import { ReactNode } from "react";
import { cn } from "@utils/cn";
import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";

export interface IPaginationButtonProps extends LinkProps {
  children: ReactNode;
}

export function PaginationButton({
  children,
  href,
  ...props
}: IPaginationButtonProps) {
  const page = useSearchParams().get("page");

  const isDisabled = page === String(href).split("=")[1];

  return (
    <Link
      className={cn(
        "focus:ring-neutral-850 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:ring-neutral-600 focus:outline-none",
        isDisabled ? "focus:ring-none hover:bg-black" : "focus:ring-4",
      )}
      {...props}
      href={href}
    >
      {children}
    </Link>
  );
}
