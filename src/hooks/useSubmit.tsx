"use client";
import { useSnackbarContext } from "@/context/SnackbarProvider";
import { store } from "@/services/api";
import axios from "axios";

export const useSubmit = () => {
  const { showMessage } = useSnackbarContext();
  const submit = async (path: string, data: Record<string, unknown>) => {
    try {
      const res = await store(path, data);
      showMessage(res.data.message, "success");
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
