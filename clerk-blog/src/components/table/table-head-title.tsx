import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableHeadTitle({ children, className, ...rest }: ITableProps) {
  return (
    <th scope="col" className={cn("px-6 py-3", className)} {...rest}>
      {children}
    </th>
  );
}
