import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function DataGridError() {
  return (
    <Box
      className="py-28 text-center"
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
    >
      <Image
        src="/images/error-icon.svg"
        alt="error"
        width={100}
        height={100}
      />
      <Typography>
        يوجد خطأ في الإتصال بقاعدة البيانات، يرجى المحاولة مرة أخرى.
      </Typography>
    </Box>
  );
}
