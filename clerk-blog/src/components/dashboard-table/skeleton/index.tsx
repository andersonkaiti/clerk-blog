import { ReactNode } from "react";
import { DashboardSkeletonRoot } from "./dashboard-root";
import { DashboardTableSkeleton } from "./dashboard-table";

export interface IDashboardSkeletonProps {
  children: ReactNode;
}

export const DashboardSkeleton = {
  Root: DashboardSkeletonRoot,
  Table: DashboardTableSkeleton,
};
