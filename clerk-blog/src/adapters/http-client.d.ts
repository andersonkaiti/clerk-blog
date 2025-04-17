export interface IHttpClient {
  url: string;
  body?: unknown;
  config?: RequestInit;
}

export interface IFetchAdapter {
  get<T>({ url, body }: IHttpClient): Promise<T[]>;
  post<T>({ url, body }: IHttpClient): Promise<T>;
  put<T>({ url, body }: IHttpClient): Promise<T>;
  delete({ url }: IHttpClient): Promise<void>;
}
