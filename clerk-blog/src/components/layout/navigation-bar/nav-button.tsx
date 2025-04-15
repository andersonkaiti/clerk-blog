import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface INavButtonProps extends LinkProps {
  children: ReactNode;
}

export function NavButton({ children, ...props }: INavButtonProps) {
  return (
    <Link
      className="w-full cursor-pointer rounded-lg border border-gray-600 bg-neutral-950 px-5 py-2.5 text-center text-sm font-medium text-white hover:border-gray-600 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-700 focus:outline-none sm:w-fit"
      {...props}
    >
      {children}
    </Link>
  );
}
