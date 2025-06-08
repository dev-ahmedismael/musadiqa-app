export type Col = {
  key: string;
  label: string;
  type?: "select" | "date";
  options?: Option[];
  filterable?: boolean;
  formatter?: (value: string | number) => string | number;
};

export type Row = Record<string, unknown>;

export type Cell = { col: string; row: number };
export type Option = {
  label: string;
  value: string | number;
};

export type DataGridProps = {
  path: string;
  cols: Col[];
};

export type TableProps = {
  cols: Col[];
  rows: Record<string, unknown>[];
};

export type SpreadsheetProps = {
  cols: Col[];
  rows: Record<string, unknown>[];
};

export type SpreadsheetState = {
  path: string;
  rows: Row[];
  cols: Col[];
  selectedCell: Cell;
  editingCell: Cell;
  dragStart: Cell | null;
  dragEndIndex: number;
  selectedRows: number[];
};

export type SpreadsheetAction =
  | { type: "SET_DATA"; payload: { rows: Row[] } }
  | { type: "SET_SELECTED_CELL"; payload: Cell }
  | { type: "SET_EDITING_CELL"; payload: Cell }
  | { type: "SET_DRAG_START"; payload: Cell | null }
  | { type: "COPY_DRAG_FILL"; payload: number }
  | { type: "SET_DRAG_END_INDEX"; payload: number }
  | { type: "UPDATE_CELL_RANGE"; payload: { col: string; value: unknown } }
  | { type: "TOGGLE_ROW_SELECTION"; payload: number }
  | { type: "TOGGLE_ALL_ROWS" }
  | { type: "SET_ROWS"; payload: Row[] };
