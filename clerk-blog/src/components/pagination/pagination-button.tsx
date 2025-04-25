import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export interface IPaginationButtonProps extends LinkProps {
  children: ReactNode;
}

export function PaginationButton({
  children,
  ...props
}: IPaginationButtonProps) {
  return (
    <Link
      className="focus:ring-neutral-850 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-black px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus:ring-4 focus:ring-neutral-600 focus:outline-none"
      {...props}
    >
      {children}
    </Link>
  );
}
