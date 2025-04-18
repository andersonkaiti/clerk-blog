export interface ITransformedPosts extends Omit<Posts, "title" | "text"> {
  title: string;
  text: string;
}
