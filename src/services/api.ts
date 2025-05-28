import axios from "axios";
import useSWR from "swr";
import qs from "qs";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("XSRF-TOKEN");
  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useIndex(path: string, params: Record<string, unknown> = {}) {
  const queryString = qs.stringify(params, { addQueryPrefix: true });
  const key = `${path}${queryString}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);
  return { data, error, isLoading, mutate };
}

export function store(path: string, payload: Record<string, unknown>) {
  return api.post(path, payload);
}

export function show(path: string, id: string | number) {
  return api.get(`${path}/${id}`);
}

export function update(
  path: string,
  id: string | number,
  payload: Record<string, unknown>
) {
  return api.put(`${path}/${id}`, payload);
}

export function destroy(path: string, id: string | number) {
  return api.delete(`${path}/${id}`);
}
