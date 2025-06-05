import api from "./api";

export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await api.get<T>(url);
  return res.data;
};
