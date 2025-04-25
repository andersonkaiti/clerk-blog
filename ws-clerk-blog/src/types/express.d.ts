import "express";

declare module "express" {
  export interface Request {
    query: {
      filter: string | undefined;
      limit: string;
      page: string;
    };
    params: {
      userId: string;
      postId: string;
    };
  }
}
