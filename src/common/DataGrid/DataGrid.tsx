"use client";

import { Box, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FilterListIcon from "@mui/icons-material/FilterList";
import Search from "./Search";
import ToggleView from "./ToggleView";
import { useEffect, useState } from "react";
import Table from "./Table/Table";
import Spreadsheet from "./Spreadsheet/Spreadsheet";
import { DataGridProps } from "@/types/datagrid.types";
import { useIndex } from "@/services/api";
import DataGridLoading from "./Loading";
import DataGridError from "./Error";
import { SpreadsheetProvider } from "@/context/SpreadsheetContext";
import DataGridPagination from "./Pagination";
import { usePathname, useRouter } from "next/navigation";

export default function DataGrid({ path, cols }: DataGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [params, setParams] = useState<Record<string, unknown>>({});
  const { data, isLoading, error } = useIndex(path, params);

  const [view, setView] = useState("table");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleViewChange = (view: string) => {
    setView(view);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setParams((prev) => ({
      ...prev,
      page: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPerPage = parseInt(event.target.value, 10);
    setParams((prev) => ({
      ...prev,
      per_page: newPerPage,
      page: 1,
    }));
  };

  const create = () => {
    router.push(`${pathname}/create`);
  };

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      search: search || undefined,
    }));
  }, [search]);

  return (
    <Box>
      <Box className="border border-gray-300">
        {!error && (
          <Box className="flex flex-col lg:flex-row justify-between gap-5 p-5">
            <Box className="w-full lg:w-fit">
              <Search onSearch={handleSearch} />
            </Box>
            <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  minWidth: "max-content",
                  flexWrap: "nowrap",
                }}
              >
                <ToggleView view={view} onViewChange={handleViewChange} />

                <Button
                  variant="text"
                  sx={{ color: "text.secondary", flexShrink: 0 }}
                  startIcon={<FilterListIcon />}
                >
                  تصفية
                </Button>
                <Button
                  sx={{ color: "text.secondary", flexShrink: 0 }}
                  startIcon={<FileUploadIcon />}
                >
                  استيراد
                </Button>
                <Button
                  sx={{ color: "text.secondary", flexShrink: 0 }}
                  startIcon={<FileDownloadIcon />}
                >
                  تصدير
                </Button>

                <Button
                  sx={{ flexShrink: 0 }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={create}
                >
                  إضافة
                </Button>
              </Stack>
            </Box>
          </Box>
        )}

        {error ? (
          <DataGridError />
        ) : isLoading ? (
          <DataGridLoading cols={cols} />
        ) : data ? (
          view === "table" ? (
            <SpreadsheetProvider
              path={path}
              initialRows={data.data}
              initialCols={cols}
            >
              <Table cols={cols} rows={data.data} />
            </SpreadsheetProvider>
          ) : (
            <SpreadsheetProvider
              path={path}
              initialRows={data.data}
              initialCols={cols}
            >
              <Spreadsheet />
            </SpreadsheetProvider>
          )
        ) : null}
      </Box>

      <Box className="py-2">
        {data && (
          <DataGridPagination
            currentPage={data.current_page}
            rowsPerPage={data.per_page}
            count={data.total}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Box>
  );
}
