import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableRowHead({ children, className }: ITableProps) {
  return (
    <th
      scope="row"
      className={cn(
        "px-6 py-4 font-medium whitespace-nowrap text-white",
        className,
      )}
    >
      {children}
    </th>
  );
}
