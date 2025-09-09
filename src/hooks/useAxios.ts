import axios from "axios";

export type UseAxiosType = <T, R = any>(
  url: string,
  method: "POST" | "DELETE" | "PUT" | "GET",
  data?: T,
  headers?: any
) => Promise<R>;

export const useAxios = () => {
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
        ...headers,
      },
    });
  };

  return useAxios;
};
