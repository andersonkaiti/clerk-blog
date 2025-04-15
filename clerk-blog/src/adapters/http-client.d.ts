export interface IHttpClient {
  url: string;
  body?: unknown;
  config?: RequestInit;
}
