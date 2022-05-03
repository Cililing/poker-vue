import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

export const onRequestDoNothing = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

export const onResponseDoNothing = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
