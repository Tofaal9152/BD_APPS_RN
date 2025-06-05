import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetcher = async <T = any>(url: string): Promise<T> => {
  const res = await api.get<T>(url);
  return res.data;
};
