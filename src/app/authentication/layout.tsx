"use client";
import { Box, Paper } from "@mui/material";
import Image from "next/image";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      className="w-full flex justify-center items-center p-7 relative"
      sx={{ minHeight: "100vh" }}
    >
      <Image
        src="/images/bg.webp"
        alt="background"
        fill
        className="object-fill relative -z-10"
        priority
      />
      <Paper square={false} className="p-7">
        <Box className="flex justify-center">
          <Image src="/images/logo.webp" alt="logo" width="70" height="70" />
        </Box>
        {children}
      </Paper>
    </Box>
  );
}
