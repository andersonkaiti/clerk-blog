import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";
import clsx from "clsx";

export function TableRowHead({ children, className }: ITableProps) {
  return (
    <th
      scope="row"
      className={twMerge(
        "px-6 py-4 font-medium whitespace-nowrap text-white",
        clsx(className),
      )}
    >
      {children}
    </th>
  );
}
