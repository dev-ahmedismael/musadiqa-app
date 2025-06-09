import { TableProps } from "@/types/datagrid.types";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Empty from "../Empty";

export default function Table({ cols, rows }: TableProps) {
  return (
    <TableContainer>
      <MuiTable stickyHeader aria-label="data table">
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell
                key={col.key}
                sx={{
                  fontWeight: "bold",
                  bgcolor: "#f3f4f6",
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  transition: "background-color 0.3s ease",
                  "&:hover": { backgroundColor: grey[100] },
                }}
              >
                {cols.map((col) => (
                  <TableCell key={col.key} sx={{ color: "text.secondary" }}>
                    {String(row[col.key] || "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <Empty />
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
