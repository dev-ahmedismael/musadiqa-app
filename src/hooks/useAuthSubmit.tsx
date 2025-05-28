"use client";
import { useSnackbarContext } from "@/providers/SnackbarProvider";
import { store } from "@/services/api";
import { getCsrfCookie } from "@/services/cookies";
import axios from "axios";

export const useAuthSubmit = () => {
  const { showMessage } = useSnackbarContext();
  const submit = async (path: string, data: Record<string, unknown>) => {
    try {
      await getCsrfCookie();
      const res = await store(path, data);
      return res;
    } catch (error) {
      let message = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }

      showMessage(message, "error");
    }
  };

  return { submit };
};
