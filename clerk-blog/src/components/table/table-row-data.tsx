import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";
import clsx from "clsx";

export function TableRowData({ children, className }: ITableProps) {
  return (
    <td className={twMerge("flex items-center px-6 py-4", clsx(className))}>
      {children}
    </td>
  );
}
