"use client";

import { SpreadsheetAction, SpreadsheetState } from "@/types/datagrid.types";

export function spreadsheetReducer(
  state: SpreadsheetState,
  action: SpreadsheetAction
): SpreadsheetState {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        rows: action.payload.rows,
      };
    case "SET_SELECTED_CELL":
      if (
        state.selectedCell.col === action.payload.col &&
        state.selectedCell.row === action.payload.row
      ) {
        return { ...state, editingCell: action.payload };
      }
      return {
        ...state,
        selectedCell: action.payload,
        editingCell: { col: "", row: -1 },
      };

    case "SET_DRAG_START":
      return {
        ...state,
        dragStart: action.payload,
      };
    case "COPY_DRAG_FILL": {
      if (!state.dragStart) return state;

      const { col, row: startRow } = state.dragStart;
      const endRow = action.payload;

      if (endRow <= startRow)
        return {
          ...state,
          dragStart: null,
          dragEndIndex: -1,
        };

      const sourceValue = state.rows[startRow][col];
      const newRows = [...state.rows];

      for (let i = startRow + 1; i <= endRow; i++) {
        newRows[i] = { ...newRows[i], [col]: sourceValue };
      }

      return {
        ...state,
        rows: newRows,
        dragStart: null,
        dragEndIndex: -1,
      };
    }

    case "SET_DRAG_END_INDEX":
      return {
        ...state,
        dragEndIndex: action.payload,
      };
    case "TOGGLE_ROW_SELECTION": {
      const index = action.payload;
      const selectedRows = state.selectedRows.includes(index)
        ? state.selectedRows.filter((i) => i !== index)
        : [...state.selectedRows, index];
      return { ...state, selectedRows };
    }
    case "TOGGLE_ALL_ROWS": {
      const allSelected = state.selectedRows.length === state.rows.length;
      return {
        ...state,
        selectedRows: allSelected ? [] : state.rows.map((_, i) => i),
      };
    }
    case "SET_ROWS":
      return { ...state, rows: action.payload };
    default:
      return state;
  }
}
