import { IPost } from "./user-post";

export interface IPaginatedPosts {
  first: number;
  prev: number | null;
  page: number;
  next: number | null;
  last: number;
  count: number;
  data: IPost[];
}
