"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { spreadsheetReducer } from "./SpreadsheetReducer";
import {
  Col,
  Row,
  SpreadsheetAction,
  SpreadsheetState,
} from "@/types/datagrid.types";

const SpreadsheetContext = createContext<
  | {
      state: SpreadsheetState;
      dispatch: Dispatch<SpreadsheetAction>;
    }
  | undefined
>(undefined);

export function SpreadsheetProvider({
  children,
  initialCols,
  initialRows,
  path,
}: {
  children: ReactNode;
  initialCols: Col[];
  initialRows: Row[];
  path: string;
}) {
  const initialState: SpreadsheetState = {
    path: path,
    cols: initialCols,
    rows: initialRows,
    selectedCell: { col: "", row: -1 },
    editingCell: { col: "", row: -1 },
    dragStart: null,
    dragEndIndex: -1,
    selectedRows: [],
  };

  const [state, dispatch] = useReducer(spreadsheetReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      payload: {
        rows: initialRows,
      },
    });
  }, [initialRows]);

  return (
    <SpreadsheetContext.Provider value={{ state, dispatch }}>
      {children}
    </SpreadsheetContext.Provider>
  );
}

export function useSpreadsheetContext() {
  const context = useContext(SpreadsheetContext);
  if (!context)
    throw new Error(
      "useSpreadsheetContext must be used within SpreadsheetProvider"
    );
  return context;
}
