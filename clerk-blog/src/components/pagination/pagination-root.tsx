"use client";

import { ReactNode } from "react";

export interface IPaginationProps {
  children: ReactNode;
}

export function PaginationRoot({ children }: IPaginationProps) {
  return <div className="flex w-fit gap-2">{children}</div>;
}
