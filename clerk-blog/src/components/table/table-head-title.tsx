import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableHeadTitle({ children, className }: ITableProps) {
  return (
    <th scope="col" className={cn("px-6 py-3", className)}>
      {children}
    </th>
  );
}
