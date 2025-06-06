export interface IPaginatedPost {
  filter: string;
  skip: number;
  take: number;
}

export interface IPaginatedPostByUserId extends IPaginatedPost {
  userId: string;
}

export interface ICountByUserId {
  userId: string;
  filter: string;
}
