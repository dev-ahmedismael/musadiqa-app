"use client";
import DataGrid from "@/common/DataGrid/DataGrid";
import { Col } from "@/types/datagrid.types";

const cols: Col[] = [
  {
    key: "name",
    label: "الاسم",
  },
];

const path = "cost-centers";

export default function CostCenters() {
  return <DataGrid path={path} cols={cols} />;
}
