"use client";
import { lightTheme } from "../../../../theme";

export default function SpreadsheetHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="text-white py-1"
      style={{ backgroundColor: lightTheme.palette.primary.main }}
    >
      {children}
    </th>
  );
}
