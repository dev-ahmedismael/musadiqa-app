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
import { destroy } from "@/services/api";
import { useSpreadsheetContext } from "@/context/SpreadsheetContext";

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
  const confirmDelete = async () => {
    await destroy(state.path, ids).then(() => closeDeleteDialog());
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
