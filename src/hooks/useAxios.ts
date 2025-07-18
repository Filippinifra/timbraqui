import axios from "axios";
import { useAuthData } from "../context/AuthDataContext";

export type UseAxiosType = <T, R = any>(
  url: string,
  method: "POST" | "DELETE" | "PUT" | "GET",
  data?: T,
  headers?: any
) => Promise<R>;

export const useAxios = () => {
  const { clerkToken } = useAuthData();

  const useAxios: UseAxiosType = <T, R = any>(
    url: string,
    method: "POST" | "DELETE" | "PUT" | "GET",
    data?: T,
    headers?: any
  ) => {
    return axios<T, R>({
      url,
      method,
      data,
      headers: {
        clerk: clerkToken,
        ...headers,
      },
    });
  };

  return useAxios;
};
