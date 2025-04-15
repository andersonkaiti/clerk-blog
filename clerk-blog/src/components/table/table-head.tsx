import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";
import clsx from "clsx";

export function TableHead({ children, className }: ITableProps) {
  return (
    <thead
      className={twMerge(
        "bg-neutral-900 text-xs text-gray-400 uppercase",
        clsx(className),
      )}
    >
      <tr>{children}</tr>
    </thead>
  );
}
