"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";

type SnackbarContextType = {
  showMessage: (message: string, severity?: AlertColor) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showMessage = (msg: string, severity: AlertColor = "success") => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        slots={{ transition: Slide }}
        slotProps={{
          transition: { direction: "left" } as TransitionProps,
        }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  return context;
}
