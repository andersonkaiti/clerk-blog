import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";
import clsx from "clsx";

export function TableBody({ children, className }: ITableProps) {
  return <tbody className={twMerge(clsx(className))}>{children}</tbody>;
}
