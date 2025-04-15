import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ITableProps } from ".";

export function TableHeadTitle({ children, className }: ITableProps) {
  return (
    <th scope="col" className={twMerge("px-6 py-3", clsx(className))}>
      {children}
    </th>
  );
}
