import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

export interface INavButtonProps extends LinkProps {
  children: ReactNode;
}

export function NavButton({ children, ...props }: INavButtonProps) {
  return (
    <Link
      className="w-full cursor-pointer bg-neutral-950 px-5 py-2.5 text-center font-medium text-white transition-all duration-100 hover:text-blue-600 sm:w-fit"
      {...props}
    >
      {children}
    </Link>
  );
}
