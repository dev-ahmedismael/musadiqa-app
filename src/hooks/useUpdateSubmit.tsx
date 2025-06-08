"use client";
import { useSnackbarContext } from "@/context/SnackbarProvider";
import { update } from "@/services/api";
import axios from "axios";

export const useUpdateSubmit = () => {
  const { showMessage } = useSnackbarContext();
  const updateSubmit = async (
    path: string,
    id: string,
    data: Record<string, unknown>
  ) => {
    try {
      const res = await update(path, id, data);
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

  return { updateSubmit };
};
