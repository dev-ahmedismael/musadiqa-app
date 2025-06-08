import { TablePagination } from "@mui/material";

export type PaginationProps = {
  currentPage: number;
  rowsPerPage: number;
  count: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function DataGridPagination({
  currentPage,
  rowsPerPage,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: PaginationProps) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={currentPage - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[100, 250, 500]}
    />
  );
}
