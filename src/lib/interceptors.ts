import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { getItem } from "./localStorage";

export interface ConsoleError {
  status: number;
  data: unknown;
}

interface SessionObject {
  state: {
    token: string;
    isAuthenticated: string;
  };
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const session = getItem<SessionObject>("auth");
  if (session?.state.token) {
    config.headers.set("Authorization", `Bearer ${session.state.token}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error("Error", error.message);
    }
    await Promise.reject(error);
  }
};
