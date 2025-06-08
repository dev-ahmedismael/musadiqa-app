"use client";

import { useSpreadsheetContext } from "@/context/SpreadsheetContext";
import { Col, Row } from "@/types/datagrid.types";
import {
  Box,
  Checkbox,
  ClickAwayListener,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePathname, useRouter } from "next/navigation";
import DeleteConfirmDialog from "../DeleteConfirmDialog";

const SpreadsheetRow = React.memo(function SpreadsheetRow({
  row,
  cols,
  index,
}: {
  row: Row;
  cols: Col[];
  index: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useSpreadsheetContext();
  const { selectedCell, editingCell, dragStart, dragEndIndex, selectedRows } =
    state;

  const { register, handleSubmit, reset } = useForm<Row>({
    defaultValues: row,
  });

  const onSubmit = (data: Row) => {
    console.log("Row submitted:", data);
  };

  const isRowSelected = selectedRows.includes(index);

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const editRow = (id: string) => {
    router.push(`${pathname}/edit/${id}`);
  };

  // Delete Dialog
  const [rowsToDelete, setRowsToDelete] = useState<(string | number)[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const closeDeleteDialog = () => {
    setRowsToDelete([]);
    setIsDeleteDialogOpen(false);
  };
  const deleteRow = (id: string) => {
    handleCloseContextMenu();
    setRowsToDelete([id]);
    setIsDeleteDialogOpen(true);
  };
  // End of Delete Dialog

  useEffect(() => {
    reset(row);
  }, [row, reset]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (state.dragStart) {
        dispatch({ type: "COPY_DRAG_FILL", payload: state.dragEndIndex });
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [dispatch, state.dragEndIndex, state.dragStart]);

  return (
    <tr
      onMouseEnter={() => {
        if (state.dragStart) {
          dispatch({ type: "SET_DRAG_END_INDEX", payload: index });
        }
      }}
    >
      <td className="flex justify-center items-center border-b border-gray-300">
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          size="small"
          checked={isRowSelected}
          onChange={() =>
            dispatch({ type: "TOGGLE_ROW_SELECTION", payload: index })
          }
        />
      </td>

      {cols.map((col) => (
        <td
          key={col.key}
          data-index={index}
          className={`cursor-cell text-nowrap relative select-none ${
            selectedCell.row === index && selectedCell.col === col.key
              ? "border-2 border-green-600"
              : "border border-slate-200"
          } ${
            dragStart &&
            index > dragStart?.row &&
            index <= dragEndIndex &&
            col.key === dragStart.col
              ? "bg-green-50"
              : ""
          }`}
          onClick={() =>
            dispatch({
              type: "SET_SELECTED_CELL",
              payload: { col: col.key, row: index },
            })
          }
          onContextMenu={handleContextMenu}
          style={{ cursor: "context-menu" }}
        >
          {col.type == "select" ? (
            <select
              {...register(col.key)}
              onBlur={handleSubmit(onSubmit)}
              className="w-full h-[30px] focus:outline-0"
            >
              {col.options?.map((o) => (
                <option key={o.value} label={o.label} value={o.value} />
              ))}
            </select>
          ) : editingCell.row == index && editingCell.col == col.key ? (
            <input
              className="focus:outline-0 w-full px-2 py-1"
              {...register(col.key)}
              onBlur={handleSubmit(onSubmit)}
            />
          ) : (
            <input
              className="focus:outline-0 w-full cursor-cell px-2 py-1"
              {...register(col.key)}
              readOnly
            />
          )}

          {/* Dragger */}
          {selectedCell.row === index && selectedCell.col === col.key && (
            <div
              onMouseDown={() =>
                dispatch({
                  type: "SET_DRAG_START",
                  payload: { col: col.key, row: index },
                })
              }
              id="dragger"
              className="absolute z-40 -bottom-1.5 -left-1.5 p-1 outline-2 outline-white bg-green-600 cursor-crosshair select-none"
            ></div>
          )}
        </td>
      ))}
      {/* Context Menu */}
      <ClickAwayListener onClickAway={handleCloseContextMenu}>
        <Menu
          open={contextMenu !== null}
          onClose={handleCloseContextMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "0px 2px 4px rgba(0,0,0,0.10)",
            },
          }}
        >
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => editRow(row.id as string)}
          >
            <Box display={"flex"} gap={2}>
              <EditIcon color="primary" />
              <Typography>تعديل الصف</Typography>
            </Box>
          </MenuItem>
          <MenuItem sx={{ color: "text.secondary" }}>
            <Box display={"flex"} gap={2}>
              <KeyboardDoubleArrowUpIcon color="primary" />
              <Typography>إضافة صف لأعلى</Typography>
            </Box>
          </MenuItem>
          <MenuItem sx={{ color: "text.secondary" }}>
            <Box display={"flex"} gap={2}>
              <KeyboardDoubleArrowDownIcon color="primary" />
              <Typography>إضافة صف لأسفل</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            sx={{ color: "text.secondary" }}
            onClick={() => deleteRow(row.id as string)}
          >
            <Box display={"flex"} gap={2}>
              <DeleteOutlineIcon color="error" />
              <Typography>حذف الصف</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </ClickAwayListener>
      {/* Delete Dialog */}
      <DeleteConfirmDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        closeDeleteDialog={closeDeleteDialog}
        ids={rowsToDelete}
      />
    </tr>
  );
});

export default SpreadsheetRow;
