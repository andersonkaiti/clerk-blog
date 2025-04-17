import { cn } from "@utils/cn";
import { ITableProps } from ".";

export function TableBody({ children, className }: ITableProps) {
  return <tbody className={cn(className)}>{children}</tbody>;
}
