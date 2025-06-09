"use client";
import DataGrid from "@/common/DataGrid/DataGrid";
import { Col } from "@/types/datagrid.types";

const cols: Col[] = [
  {
    key: "name",
    label: "اسم المشروع",
  },
];

const path = "projects";

export default function Projects() {
  return <DataGrid path={path} cols={cols} />;
}
