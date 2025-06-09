"use client";
import { useSpreadsheetContext } from "@/context/SpreadsheetContext";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";

export default function Empty() {
  const { state } = useSpreadsheetContext();
  const { cols } = state;
  return (
    <TableRow>
      <TableCell colSpan={cols.length + 2}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign="center"
          py={4}
        >
          <Image
            src={"/images/empty.svg"}
            alt="Empty State"
            width={300}
            height={300}
          />
          <Typography variant="h5" color="text.secondary">
            لا توجد بيانات لعرضها.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}
