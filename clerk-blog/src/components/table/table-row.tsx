import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";
import clsx from "clsx";

export function TableRow({ children, className }: ITableProps) {
  return (
    <tr
      className={twMerge(
        "border-b border-gray-700 bg-neutral-950",
        clsx(className),
      )}
    >
      {children}
    </tr>
  );
}
