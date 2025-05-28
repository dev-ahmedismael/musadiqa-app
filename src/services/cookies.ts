import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export function getCsrfCookie() {
  return api.get("/sanctum/csrf-cookie");
}
