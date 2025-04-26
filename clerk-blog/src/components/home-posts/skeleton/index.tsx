import { ReactNode } from "react";
import { SkeletonContainer } from "./skeleton-container";
import { SkeletonCards } from "./skeleton-posts";

export interface ISkeleton {
  children: ReactNode;
}

export const HomeSkeleton = {
  Root: SkeletonContainer,
  Cards: SkeletonCards,
};
