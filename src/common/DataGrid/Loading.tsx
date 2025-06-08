import { Col } from "@/types/datagrid.types";
import { Box, Skeleton } from "@mui/material";

export default function DataGridLoading({ cols }: { cols: Col[] }) {
  const rowCount = 50;

  return (
    <Box>
      {/* Header */}
      <Box display="flex" className="bg-gray-100 border-b border-slate-300">
        {cols.map((col) => (
          <Box
            key={col.key}
            flex={1}
            p={2}
            borderRight="1px solid #e0e0e0"
            fontWeight="bold"
          >
            <Skeleton width="60%" />
          </Box>
        ))}
      </Box>

      {/* Rows */}
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <Box key={rowIndex} display="flex" borderBottom="1px solid #e0e0e0">
          {cols.map((col, colIndex) => (
            <Box key={colIndex} flex={1} p={2} borderRight="1px solid #f0f0f0">
              <Skeleton height={20} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
