"use client";

import {
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SpreadsheetHeader from "./SpreadsheetHeader";
import { useSpreadsheetContext } from "@/context/SpreadsheetContext";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpreadsheetRow from "./SpreadsheetRow";
import Empty from "../Empty";
import { lightTheme } from "../../../../theme";

export default function Spreadsheet() {
  const { state, dispatch } = useSpreadsheetContext();
  const { cols, rows, selectedRows } = state;

  const areAllRowsSelected =
    rows.length > 0 && selectedRows.length === rows.length;

  const toggleAllRows = () => {
    dispatch({ type: "TOGGLE_ALL_ROWS" });
  };

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <th
              className="text-white py-1 w-[5px]"
              style={{ backgroundColor: lightTheme.palette.primary.main }}
            >
              <Checkbox
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{ color: "white" }}
                color="secondary"
                size="small"
                checked={areAllRowsSelected}
                onChange={toggleAllRows}
              />
            </th>

            <th
              className="text-white py-1 w-[5px]"
              style={{ backgroundColor: lightTheme.palette.primary.main }}
            >
              {" "}
            </th>

            {cols.map((col) => (
              <SpreadsheetHeader key={col.key}>{col.label}</SpreadsheetHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <SpreadsheetRow
                key={rowIndex}
                row={row}
                cols={cols}
                index={rowIndex}
              />
            ))
          ) : (
            <Empty />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
