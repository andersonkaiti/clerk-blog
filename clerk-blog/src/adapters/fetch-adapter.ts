import { IFetchAdapter, IHttpClient } from "./http-client";

export class FetchAdapter implements IFetchAdapter {
  private async request({ url, body, config }: IHttpClient) {
    try {
      const res = await fetch(url, {
        body: JSON.stringify(body),
        ...config,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
      }
    }
  }

  async get<T>({ url }: IHttpClient): Promise<T[]> {
    return await this.request({
      url,
    });
  }

  async post<T>({ url, body }: IHttpClient): Promise<T> {
    return await this.request({
      url,
      body,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    });
  }

  async put<T>({ url, body }: IHttpClient): Promise<T> {
    return await this.request({
      url,
      body,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      },
    });
  }

  async delete({ url }: IHttpClient): Promise<void> {
    await this.request({
      url,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      },
    });
  }
}
