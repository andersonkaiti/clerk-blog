import { IErrors } from "@validators/post";

interface ISuccess {
  success: boolean;
}

export type State = IErrors | ISuccess | null;
