import axios, { AxiosInstance } from "axios";
import { NewsResponse } from "@/types/news";
import {
  onRequest,
  onRequestDoNothing,
  onRequestError,
  onResponse,
  onResponseDoNothing,
  onResponseError,
} from "@/services/loggingInterceptors";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

export type Options = { headers?: Record<string, unknown>; code?: number };
export type APIResponse<T> = [T, null, Options?] | [null, Error, Options?];

export class BackendService {
  constructor(private httpClient: AxiosInstance, debug: boolean) {
    if (debug) {
      this.httpClient.interceptors.request.use(onRequest, onRequestError);
      this.httpClient.interceptors.response.use(onResponse, onResponseError);
    } else {
      this.httpClient.interceptors.request.use(
        onRequestDoNothing,
        onRequestError
      );
      this.httpClient.interceptors.response.use(
        onResponseDoNothing,
        onResponseError
      );
    }
  }

  async getNews(): Promise<APIResponse<NewsResponse>> {
    try {
      const { data, headers } = await this.httpClient.get<NewsResponse>(
        "/news"
      );
      return [data, null, { headers }];
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return [null, error, error.response?.status];
    }
  }
}

// TODO: Get debug flag from the env
export const backendService = new BackendService(client, true);
