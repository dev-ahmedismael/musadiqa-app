"use client";
import { Box, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

export default function CreatePageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  return (
    <Box className="border border-gray-300 mb-5 ">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        className="border-b border-gray-300 py-4 px-5 bg-white"
      >
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <CreateIcon color="primary" />
          <Typography variant="h5" color="primary">
            {title}
          </Typography>
        </Box>
        <Box
          onClick={() => router.back()}
          sx={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
          aria-label="Go back"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") router.back();
          }}
        >
          <CloseIcon color="error" />
        </Box>
      </Box>
      <Box className="px-5 py-10">{children}</Box>
    </Box>
  );
}
