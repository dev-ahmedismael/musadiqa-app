"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { destroy, useIndex } from "@/services/api";
import { useSpreadsheetContext } from "@/context/SpreadsheetContext";
import { useSnackbarContext } from "@/context/SnackbarProvider";
import axios from "axios";

export type DeleteDialogProps = {
  ids: (string | number)[];
  isDeleteDialogOpen: boolean;
  closeDeleteDialog: () => void;
};

export default function DeleteConfirmDialog({
  ids,
  closeDeleteDialog,
  isDeleteDialogOpen,
}: DeleteDialogProps) {
  const { state } = useSpreadsheetContext();
  const { showMessage } = useSnackbarContext();
  const { mutate } = useIndex(state.path);

  const confirmDelete = async () => {
    try {
      await destroy(state.path, ids)
        .then((res) => {
          showMessage(res.data.message, "success");
        })
        .then(() => {
          closeDeleteDialog();
          mutate();
        });
    } catch (error) {
      let message = "حدث خطأ غير متوقع";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      }

      showMessage(message, "error");
      closeDeleteDialog();
    }
  };

  return (
    <Dialog onClose={closeDeleteDialog} open={isDeleteDialogOpen} fullWidth>
      <DialogTitle>تأكيد الحذف</DialogTitle>
      <DialogContent>
        <DialogContentText>
          هل أنت متأكد أنك تريد حذف {ids.length} صف؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={closeDeleteDialog}
          startIcon={<ClearIcon />}
        >
          إلغاء
        </Button>
        <Button
          onClick={confirmDelete}
          color="error"
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
