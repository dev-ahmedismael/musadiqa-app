"use client";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { lightTheme } from "../../theme";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "./SnackbarProvider";
import dynamic from "next/dynamic";
const RtlCacheProvider = dynamic(() => import("./RtlProvider"), {
  ssr: false,
});

export default function GlobalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <RtlCacheProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </RtlCacheProvider>
    </AppRouterCacheProvider>
  );
}
